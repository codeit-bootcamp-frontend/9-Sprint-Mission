import BestPost from "@/src/components/boards/BestPost";
import AllPost from "@/src/components/boards/AllPost";
import axios from "@/src/lib/axios";
import Contanier from "../components/Layout/Container";
import { Post, BoardsProps } from "@/src/types";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const q = context.query.q !== undefined ? context.query.q : null;
  let bestPosts: Post[] = [];
  let posts: Post[] = [];

  try {
    const res = await axios.get(`/articles?page=1&pageSize=3&orderBy=like`);
    bestPosts = JSON.parse(JSON.stringify(res.data.list)) ?? [];
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await axios.get(`/articles?page=1&pageSize=10&orderBy=recent`);
    posts = JSON.parse(JSON.stringify(res.data.list)) ?? [];
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      bestPosts,
      posts,
      q,
    },
  };
}

export default function Boards({ bestPosts, posts, q }: BoardsProps) {
  return (
    <>
      <Contanier>
        <BestPost bestPosts={bestPosts} />
        <AllPost posts={posts} q={q} />
      </Contanier>
    </>
  );
}
