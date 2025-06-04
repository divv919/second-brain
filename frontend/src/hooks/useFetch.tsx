import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
export const useFetch = <T = unknown,>(url: string) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);
  async function fetchData(url: string) {
    try {
      setLoading(true);

      const response = await fetch(url, {
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData(url);
  }, [url]);

  const refetch = () => {
    fetchData(url);
  };

  return { data, loading, error, refetch };
};
