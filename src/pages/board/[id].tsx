import IndividualBoard from "@/src/components/board/IndividualBoard";
import AddComment from "@/src/components/board/AddComment";
import Comments from "@/src/components/board/Comments";
import ReturnButton from "@/src/components/board/ReturnButton";
import axios from "@/src/lib/axios";
import { GetServerSidePropsContext } from "next";
import { Post, Comment, DetailBoardProps } from "@/src/types";
import { ParsedUrlQuery } from "querystring";
import Contanier from "@/src/components/Layout/Container";

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
) {
  const { params } = context;

  if (!params || !params.id) {
    return {
      notFound: true,
    };
  }

  const boardId = params.id;
  let board: Post;
  let comments: Comment[];
  try {
    const res = await axios.get(`/articles/${boardId}`);
    board = res.data;
  } catch {
    return {
      notFound: true,
    };
  }

  const res = await axios.get(`/articles/${boardId}/comments?limit=10`);
  comments = res.data.list ?? [];

  return {
    props: {
      board,
      comments,
    },
  };
}

export default function DetailBoard({ board, comments }: DetailBoardProps) {
  return (
    <div>
      <Contanier>
        <IndividualBoard board={board} />
        <AddComment />
        <Comments comments={comments} />
        <ReturnButton />
      </Contanier>
    </div>
  );
}
