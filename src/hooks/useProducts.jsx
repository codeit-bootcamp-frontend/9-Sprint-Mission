import axios from "axios";
import { useEffect, useState } from "react";
import { getProducts } from "../api/product";

const useProducts = (page, pageSize, orderBy) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getProducts({
          page,
          pageSize,
          orderBy,
        });
        setProducts(result);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("AxiosError", error);
        } else {
          console.log("Data loading error", error);
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, orderBy]);

  return { products, isLoading, error };
};

export default useProducts;
