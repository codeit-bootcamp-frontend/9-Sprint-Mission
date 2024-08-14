import { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/items/items";

function useProducts(page, pageSize, orderBy) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchItems = async ({ page, pageSize, orderBy }) => {
      setLoading(true);
      try {
        const responseInfo = await getProducts({ page, pageSize, orderBy });
        setItems(responseInfo.data.list);
        setTotalCount(responseInfo.data.totalCount);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems({ page, pageSize, orderBy });
  }, [page, pageSize, orderBy]);

  return { items, totalCount };
}

export default useProducts;
