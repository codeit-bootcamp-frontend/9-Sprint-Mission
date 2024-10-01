import instance from "./axios";
import { Article } from "@/types/articles";

// API 호출을 위한 함수
const getArticles = async (
  page: number,
  pageSize: number,
  orderBy: string | string[],
  keyword: string | string[]
) => {
  const res = await instance.get(
    `/articles/?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`
  );
  return res.data.list as Article[];
};

export default getArticles;
