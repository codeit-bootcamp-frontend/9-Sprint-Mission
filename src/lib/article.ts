import axios from "./axios";
export async function getArticles() {
  const response = await axios.get("articles");
  return response.data;
}
