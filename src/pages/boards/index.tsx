import { Board } from "@/src/types/types";
import { GetStaticProps } from "next";
import axios from "@/src/lib/axios";
import MainBoard from "@/src/components/MainBoards";
import BestBoard from "@/src/components/BestBoards";

interface ListResponse {
  list: Board[];
  totalCount: number;
}

export const getStaticProps: GetStaticProps<ListResponse> = async () => {
  try {
    const res = await axios.get<ListResponse>("/articles", {
      params: {
        page: 1,
        pageSize: 10,
        orderBy: "recent",
      },
    });
    const { list = [], totalCount = 0 } = res.data || {};

    return {
      props: {
        list,
        totalCount,
      },
      // 선택적: 10초마다 데이터를 새로고침
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        list: [],
        totalCount: 0,
      },
    };
  }
};

const Boards: React.FC<ListResponse> = ({ list, totalCount }) => {
  return (
    <div className="container">
      <BestBoard />
      <MainBoard initialProducts={list} total={totalCount} />
    </div>
  );
};

export default Boards;
