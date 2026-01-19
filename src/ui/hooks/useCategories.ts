import { useEffect, useState } from "react";

interface UseCategoriesResult {
  data: any[];
  loading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesResult {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        const response = await window.api.getCategories();

        if (!mounted) return;

        if (response.success) {
          setData(response.data);
          setError(null);
        } else {
          setError(response.error);
          setData([]);
        }
      } catch (err) {
        if (!mounted) return;

        setError("Unexpected error while fetching categories");
        setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
