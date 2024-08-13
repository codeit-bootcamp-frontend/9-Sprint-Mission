import { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/items/items";

export default function useProducts(page, pageSize, orderBy) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const handleFetchedItems = async ({ page, pageSize, orderBy }) => {
      const responseInfo = await getProducts({ page, pageSize, orderBy });
      setProducts(responseInfo.data.list);
      setTotalCount(responseInfo.data.totalCount);
    };

    handleFetchedItems({ page, pageSize, orderBy });
  }, [page, pageSize, orderBy]);

  return { products, totalCount };
}
