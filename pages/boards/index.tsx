import Container from "@/components/Container";
import BestPosts from "./components/BestPosts";
import Posts from "./components/Posts";
import axios from "@/lib/axios";

export async function getStaticProps() {
  let bestPosts = [];
  let posts = [];
  try {
    const res = await axios.get(`/articles?page=1&pageSize=3&orderBy=like`);
    bestPosts = res.data.list ?? [];
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await axios.get(`/articles?page=1&pageSize=10&orderBy=recent`);
    posts = res.data.list ?? [];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      bestPosts,
      posts,
    },
  };
}

export default function BoardsListPage({ bestPosts, posts }) {
  return (
    <>
      <Container>
        <BestPosts bestPosts={bestPosts} />
        <Posts initialPosts={posts} />
      </Container>
    </>
  );
}
