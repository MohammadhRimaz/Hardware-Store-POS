import { useEffect, useState } from "react";
import { ipc } from "../api/ipc";
import { CreateProductInput } from "../../types/product";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    try {
      const data = await ipc.getProducts();
      setProducts(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(payload: CreateProductInput) {
    await ipc.createProduct(payload);
    await fetchProducts(); // refresh from truth
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refresh: fetchProducts, createProduct };
}
