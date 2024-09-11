import { useEffect, useState } from "react";
import { getProducts } from "../api/items";
import { Product, ProductResponse } from "../types/product.types";
import { FetchProductsParams } from "../types/fetch-products-params.types";

function useProducts(
  page: number,
  pageSize: number,
  orderBy: string,
  keyword: string
) {
  const [list, setList] = useState<Product[]>([]); // 상품 리스트는 Product 배열
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태는 boolean
  const [error, setError] = useState<Error | null>(null); // 에러는 Error 객체 또는 null
  const [totalCount, setTotalCount] = useState<number>(0); // 총 개수는 숫자

  useEffect(() => {
    const fetchItems = async ({
      page,
      pageSize,
      orderBy,
      keyword,
    }: FetchProductsParams) => {
      setLoading(true);
      setError(null);
      try {
        // getProducts 함수의 반환값 타입 명시
        const responseInfo: ProductResponse = await getProducts({
          page,
          pageSize,
          orderBy,
          keyword,
        });

        // 리스트와 총 개수를 상태에 저장
        setList(responseInfo.list);
        setTotalCount(responseInfo.totalCount);
      } catch (error) {
        // 에러 타입이 unknown이므로 타입 단언을 사용해 Error로 처리
        setError(error instanceof Error ? error : new Error("알 수 없는 오류"));
      } finally {
        setLoading(false);
      }
    };

    fetchItems({ page, pageSize, orderBy, keyword });
  }, [page, pageSize, orderBy, keyword]);

  return { list, totalCount, loading, error };
}

export default useProducts;
