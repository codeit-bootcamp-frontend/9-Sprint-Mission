import { Reply } from "@/types/types";

export interface Props {
  key: number;
  reply: Reply;
}

export default function ArticleReplyItem({ key, reply }: Props) {
  const { content, updatedAt } = reply;
  const { nickname, image } = reply.writer;

  return (
    <div key={key} className="reply-item">
      <div>
        <div>{content}</div>
        <div>{image}</div>
        <div>{nickname}</div>
        <div>{updatedAt}</div>
      </div>
      <div>...</div>
    </div>
  );
}
