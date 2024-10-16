import axios from "axios";
import { useEffect, useState } from "react";
import { getProducts } from "../api/product";

const useProducts = (pageSize, orderBy, page = 1) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getProducts({
          page,
          pageSize,
          orderBy,
        });
        const { list, totalCount } = result;
        setProducts(list);
        setTotalCount(totalCount);
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

  return { products, isLoading, error, totalCount };
};

export default useProducts;
