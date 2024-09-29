import instance from "./axios";

interface Query {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export const getArticles = async (articleId?: number, query?: Query) => {
  // 기본값 설정
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  }: Query = query || {};

  // 쿼리 문자열 생성
  const queryString = query
    ? `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
    : "";

  try {
    // API 호출
    const endpoint = articleId
      ? `/articles/${articleId}${queryString}`
      : `/articles/${queryString}`;

    const response = await instance.get(endpoint);
    console.log("Article Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching the articles:", error);
    throw error;
  }
};
