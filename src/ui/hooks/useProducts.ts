import { useEffect, useState } from "react";

interface UseProductsResult {
  data: any[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsResult {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const response = await window.api.getProducts();

        if (!mounted) return;

        if (response.success) {
          setData(response.data);
          setError(null);
        } else {
          setError(response.error);
          setData([]);
        }
      } catch (error) {
        if (!mounted) return;
        setError("Unexpected error while fetching products");
        setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
