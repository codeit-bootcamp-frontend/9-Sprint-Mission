import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export default instance;

// fetchPosts 함수의 매개변수와 반환값에 대한 타입 정의
// interface FetchPostsParams {
//   pageSize: number; // 페이지 크기
//   orderBy: string; // 정렬 기준
//   sortBy: string; // 정렬 방식
//   keyword?: string; // 검색 키워드 (선택적)
// }

// export const fetchPosts = async ({
//   pageSize,
//   orderBy,
//   sortBy,
//   keyword = "",
// }: FetchPostsParams) => {
//   try {
//     const response = await instance.get("/articles", {
//       params: {
//         pageSize,
//         orderBy,
//         sortBy,
//         keyword,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// };
