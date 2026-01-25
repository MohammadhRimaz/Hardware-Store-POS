import { useEffect, useState } from "react";
import { ipc } from "../api/ipc";

type Category = {
  id: number;
  name: string;
};

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const data = await ipc.getCategories();
      setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function createCategory(name: string) {
    if (!name.trim()) {
      throw new Error("Category name is required.");
    }

    await ipc.createCategory(name.trim());

    await fetchCategories(); // refresh from truth
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return { data, loading, error, createCategory, refetch: fetchCategories };
}
