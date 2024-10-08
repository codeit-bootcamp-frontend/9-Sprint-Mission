import { Reply } from "@/types/types";
import ArticleReplyItem from "./ArticleReplyItem";
import NoReply from "./NoReply";

export default function ArticleReply({
  ArticleReplyData,
}: {
  ArticleReplyData: Reply[];
}) {
  return (
    <>
      {ArticleReplyData && ArticleReplyData.length > 0 ? (
        ArticleReplyData.map((reply) => (
          <ArticleReplyItem reply={reply} key={reply.id} />
        ))
      ) : (
        <NoReply />
      )}
    </>
  );
}
