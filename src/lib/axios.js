import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

export const fetchPosts = async (pageSize, orderBy, sortBy, keyword = "") => {
  try {
    const response = await instance.get("/articles", {
      params: {
        pageSize,
        orderBy,
        sortBy,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export default instance;
