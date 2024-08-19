import { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/items/items";

function useProducts(page, pageSize, orderBy, keyword) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // fetchItems 를 내부 선언으로 변경
    const fetchItems = async ({ page, pageSize, orderBy, keyword }) => {
      setLoading(true);
      setError(null);
      try {
        const responseInfo = await getProducts({
          page,
          pageSize,
          orderBy,
          keyword,
        });
        setItems(responseInfo.list);
        setTotalCount(responseInfo.totalCount);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems({ page, pageSize, orderBy, keyword });
  }, [page, pageSize, orderBy, keyword]);

  // 훅에서 반환하는 값에 loading과 error를 추가하여 호출하는 컴포넌트에서 상태 관리를 쉽게함
  return { items, totalCount, loading, error };
}

export default useProducts;
