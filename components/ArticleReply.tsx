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
