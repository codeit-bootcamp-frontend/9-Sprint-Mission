import axios from "@/src/api/axios";
import BestCommunity from "./BestCommunity";
import AllCommunity from "./AllCommunity";
import { Community } from "@/src/types/types";

// export const getServerSideProps: GetServerSideProps = (async () => {
//   const res = await axios.get("/articles");
//   const articles: Repo = await res.data.list;

//   return { props: { articles } };
// }) satisfies GetServerSideProps<{ articles: Repo }>;

const CommunityList = ({ articles }: { articles: Community[] }) => {
  return (
    <>
      <BestCommunity articles={articles} />
      <AllCommunity articles={articles} />
    </>
  );
};

export default CommunityList;
