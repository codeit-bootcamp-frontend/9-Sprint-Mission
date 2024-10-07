import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function useAxios<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get<T>(url);
        setData(res.data);
      } catch (err) {
        if (err instanceof Error) setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, setData, error, setError, loading, setLoading };
}
