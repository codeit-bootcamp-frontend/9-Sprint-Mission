import axios from "axios";
import { useRouter } from "next/router";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const getArticleById = async () => {
    await axios.get(`articles/${id}`);
  };

  return <div className="container">{id} 게시글 페이지</div>;
}
/* 게시글 id로 가져오기
'https://panda-market-api.vercel.app/articles/1' \
{
  "id": 1,
  "title": "판다인형 구매 후기",
  "content": "판다인형 구매 후기입니다.",
  "image": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991756711/21353.png",
  "likeCount": 2,
  "createdAt": "2024-07-29T05:45:03.249Z",
  "updatedAt": "2024-08-13T15:41:10.600Z",
  "writer": {
    "id": 1,
    "nickname": "Noah.Gerhold"
  },
  "isLiked": false
}

댓글 가져오기 
  'https://panda-market-api.vercel.app/articles/1/comments?limit=10' \
{
  "list": [
    {
      "id": 138,
      "content": "아티클 1에 대한 코멘트입니다.",
      "createdAt": "2024-07-29T05:45:03.250Z",
      "updatedAt": "2024-07-29T05:45:03.250Z",
      "writer": {
        "id": 1,
        "nickname": "Noah.Gerhold",
        "image": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1722231788095/sprint-logo.png"
      }
    },
    {
      "id": 2,
      "content": "스마트폰 관리 방법에 대한 좋은 정보 감사합니다!",
      "createdAt": "2024-07-29T05:45:03.250Z",
      "updatedAt": "2024-07-29T05:45:03.250Z",
      "writer": {
        "id": 2,
        "nickname": "Brandyn67",
        "image": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1722231788095/sprint-logo.png"
      }
    }
  ],
  "nextCursor": null
}*/
