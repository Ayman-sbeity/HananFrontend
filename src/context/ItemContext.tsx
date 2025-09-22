import React, { createContext, useContext, useState, useEffect } from "react";
import type { Item } from "../services/api";
import { fetchItems } from "../services/api";

interface ItemContextType {
  items: Item[];
  addItem: (item: Item) => void;
  editItem: (id: number, updatedItem: Item) => void;
  deleteItem: (id: number) => void;
  loading: boolean;
  error: string | null;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          const fetchedItems = await fetchItems();
          setItems(fetchedItems);
        } catch (apiError) {
          console.warn("Backend not available, using sample data:", apiError);
          const sampleItems: Item[] = [
            {
              id: 1,
              name: "Sample Product 1",
              description: "This is a sample product for testing",
              price: 29.99,
              quantity: 10,
              stock: 10,
              image: "sample-image-1.jpg",
              category: "General",
            },
            {
              id: 2,
              name: "Sample Product 2",
              description: "Another sample product for the dashboard",
              price: 49.99,
              quantity: 5,
              stock: 5,
              image: "sample-image-2.jpg",
              category: "General",
            },
            {
              id: 3,
              name: "Sample Product 3",
              description: "Third sample product to show in the list",
              price: 19.99,
              quantity: 15,
              stock: 15,
              image: "sample-image-3.jpg",
              category: "General",
            },
          ];
          setItems(sampleItems);
        }
      } catch (err) {
        setError("Failed to load items");
        console.error("Error loading items:", err);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const editItem = (id: number, updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ItemContext.Provider
      value={{ items, addItem, editItem, deleteItem, loading, error }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
};
