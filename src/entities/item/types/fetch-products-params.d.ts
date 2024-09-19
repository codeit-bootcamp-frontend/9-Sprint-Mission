export interface FetchProductsParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string; // 선택적 속성으로 지정
}
