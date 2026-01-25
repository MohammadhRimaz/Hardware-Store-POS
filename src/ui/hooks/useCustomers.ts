import { useEffect, useState } from "react";
import { ipc } from "../api/ipc";

export function useCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCustomers() {
    setLoading(true);
    setError(null);

    try {
      const data = await ipc.getCustomers();
      setCustomers(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  }

  async function createCustomer(payload: { name: string; contact?: string }) {
    await ipc.createCustomer(payload);
    await fetchCustomers(); // refresh from truth
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, error, reload: fetchCustomers, createCustomer };
}
