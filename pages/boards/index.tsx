import Navbar from "@/components/Navbar";
import BestPosts from "./components/BestPosts";
import Container from "@/components/Container";
import axios from "@/lib/axios";

export async function getStaticProps() {
  let posts;
  try {
    const res = await axios.get("/articles?page=1&pageSize=3&orderBy=like");
    posts = res.data.list ?? [];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      posts,
    },
  };
}

export default function BoardsListPage({ posts }) {
  return (
    <>
      <Navbar />
      <Container>
        <BestPosts posts={posts} />
      </Container>
    </>
  );
}
