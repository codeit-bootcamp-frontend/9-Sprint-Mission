import Container from "@/components/Container";
import BestPosts from "./components/BestPosts";
import Posts from "./components/Posts";
import axios from "@/lib/axios";
import { GetStaticProps } from "next";
import { Post } from "@/types/types";

interface BoardsListPageProps {
  bestPosts: Post[];
  posts: Post[];
  total: number;
}

export const getStaticProps: GetStaticProps<BoardsListPageProps> = async () => {
  let bestPosts: Post[] = [];
  let posts: Post[] = [];
  let total = 0;

  try {
    const res = await axios.get(`/articles?page=1&pageSize=3&orderBy=like`);
    bestPosts = res.data.list ?? [];
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await axios.get(`/articles?page=1&pageSize=10&orderBy=recent`);
    posts = res.data.list ?? [];
    total = res.data.totalCount ?? 0;
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      bestPosts,
      posts,
      total,
    },
  };
};

const BoardsListPage: React.FC<BoardsListPageProps> = ({
  bestPosts,
  posts,
  total,
}) => {
  return (
    <>
      <Container>
        <BestPosts bestPosts={bestPosts} />
        <Posts initialPosts={posts} total={total} />
      </Container>
    </>
  );
};

export default BoardsListPage;
