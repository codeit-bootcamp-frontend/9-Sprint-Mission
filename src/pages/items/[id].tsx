import axios from "@/src/api/axios";

interface Props {
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
  params: any;
}

// export async function getServerSideProps(context: Props) {
//   const articleId = context.params["id"];

//   let article;
//   try {
//     const res = await axios.get(`/articles/${articleId}`);
//     article = res.data;
//   } catch {}

//   return {
//     props: {
//       article,
//     },
//   };
// }

const Boards = () => {
  return <div></div>;
};

export default Boards;
