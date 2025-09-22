import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../services/api";

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

const DEFAULT_TTL = 5 * 60 * 1000;

export function useCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const freshData = await fetchFn();

      cache[key] = {
        data: freshData,
        timestamp: Date.now(),
      };

      setData(freshData);
    } catch (err) {
      console.error(`Error fetching data for ${key}:`, err);
      setError(`Failed to load data. Please try again.`);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, key]);

  useEffect(() => {
    const loadData = async () => {
      const cachedItem = cache[key];
      const now = Date.now();

      if (cachedItem && now - cachedItem.timestamp < ttl) {
        setData(cachedItem.data);
        setLoading(false);
        return;
      }

      await refresh();
    };

    loadData();
  }, [key, refresh, ttl]);

  return { data, loading, error, refresh };
}

export function useStatsCounts() {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useCachedData<{ count: number }>("products-count", async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/products/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch product count");
    }
    return response.json();
  });

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useCachedData<{ count: number }>("users-count", async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/users/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user count");
    }
    return response.json();
  });

  const {
    data: ordersData,
    loading: ordersLoading,
    error: ordersError,
  } = useCachedData<{ count: number }>("orders-count", async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/orders/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch order count");
    }
    return response.json();
  });

  const isLoading = productsLoading || usersLoading || ordersLoading;
  const error = productsError || usersError || ordersError;

  return {
    productCount: productsData?.count || 0,
    userCount: usersData?.count || 0,
    orderCount: ordersData?.count || 0,
    isLoading,
    error,
  };
}
