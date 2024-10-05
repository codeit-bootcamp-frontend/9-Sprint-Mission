import useAxios from "@/hooks/useAxios";
import { Reply, ReplyResponse } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ArticleReplyItem from "./ArticleReplyItem";
import NoReply from "./NoReply";

export default function ArticleReply() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, setLoading } = useAxios<ReplyResponse>(
    `/articles/${id}/comments?limit=10`
  );

  useEffect(() => {
    if (!data && !loading) setLoading(true);
    console.log(data);
  });

  if (loading || !data) return <div>Loading...</div>;

  const replyList = data.list as Reply[];

  return (
    <>
      {data && data.list.length > 0 ? (
        replyList.map((reply) => (
          <ArticleReplyItem reply={reply} key={reply.id} />
        ))
      ) : (
        <NoReply />
      )}
    </>
  );
}
/*
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
