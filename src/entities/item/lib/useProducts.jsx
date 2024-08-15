import { useEffect, useState } from "react";
import { getProducts } from "../../../shared/api/items/items";

function useProducts(page, pageSize, orderBy, keyword) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  // fetchItems 함수는 useEffect 바깥에 선언하여 매번 생성되지 않도록...
  const fetchItems = async ({ page, pageSize, orderBy, keyword }) => {
    setLoading(true);
    setError(null); // 새로운 요청이 시작될 때 에러 상태 초기화
    try {
      const responseInfo = await getProducts({
        page,
        pageSize,
        orderBy,
        keyword,
      });
      setItems(responseInfo.data.list);
      setTotalCount(responseInfo.data.totalCount);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect에서는 의존성 배열을 주의 깊게 관리하여 불필요한 재요청을 방지
  useEffect(() => {
    fetchItems({ page, pageSize, orderBy, keyword });
  }, [page, pageSize, orderBy, keyword]);

  // 훅에서 반환하는 값에 loading과 error를 추가하여 호출하는 컴포넌트에서 상태 관리를 쉽게함
  return { items, totalCount, loading, error };
}

export default useProducts;
