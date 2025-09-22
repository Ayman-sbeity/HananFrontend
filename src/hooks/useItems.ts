import { useState, useEffect } from "react";
import {
  addItem,
  deleteItem,
  editItem,
  fetchItems,
  type Item,
} from "../services/api";
import { useCachedData } from "./useCachedData";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    data: cachedItems,
    loading,
    error: fetchError,
    refresh,
  } = useCachedData<Item[]>("all-items", () => fetchItems({}));

  useEffect(() => {
    if (cachedItems) {
      setItems(cachedItems);
    }

    if (fetchError) {
      setError("Failed to fetch items");
    }
  }, [cachedItems, fetchError]);

  const handleAddItem = async (newItem: Item) => {
    try {
      const addedItem = await addItem(newItem);
      setItems((prevItems) => [...prevItems, addedItem]);
      refresh();
    } catch (err) {
      setError("Failed to add item");
    }
  };

  const handleEditItem = async (updatedItem: Item) => {
    try {
      if (!updatedItem.id) throw new Error("Item ID is required");
      const editedItem = await editItem(String(updatedItem.id), updatedItem);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === editedItem.id ? editedItem : item))
      );
      refresh();
    } catch (err) {
      setError("Failed to edit item");
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await deleteItem(String(itemId));
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      refresh();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return {
    items,
    loading,
    error,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    refresh,
  };
};
