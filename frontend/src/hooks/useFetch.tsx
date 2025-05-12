import { useEffect, useState } from "react";

export const useFetch = <T = unknown,>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);
  async function fetchData(url: string) {
    try {
      setLoading(true);

      const response = await fetch(url, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIxYTUyYTUxOWU1NjdmYThmMzRkNjEiLCJpYXQiOjE3NDcwMzU0Mzh9.C5rS8L233xWV23KbNvkZGAQyrYOVysdxBuT_9yS5cbo",
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
