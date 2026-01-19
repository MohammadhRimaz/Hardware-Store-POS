import { useEffect, useState } from "react";

interface UseCustomersResult {
  data: any[];
  loading: boolean;
  error: string | null;
}

export function useCustomers(): UseCustomersResult {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCustomers() {
      try {
        const response = await window.api.getCustomers();

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
        setError("Unexpected error while fetching customers");
        setData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCustomers();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
