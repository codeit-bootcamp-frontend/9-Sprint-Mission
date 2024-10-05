import ArticleReply from "@/components/ArticleReply";
import ArticleView from "@/components/ArticleView";
import SubmitBtn from "@/components/SubmitBtn";
import { TextInput } from "@/components/TextInput";
import { ChangeEvent, useState } from "react";

export default function Article() {
  const [replyValue, setReplyValue] = useState<string>("");
  const handleChangeReply = (e: ChangeEvent<HTMLInputElement>) => {
    const newReply = e.target.value;
    setReplyValue(newReply);
  };

  let active = false;
  if (replyValue !== "") active = true;

  return (
    <div className="container">
      <ArticleView />
      <form>
        <TextInput
          label="reply"
          placeholder="댓글을 입력해주세요"
          required
          value={replyValue}
          onChange={handleChangeReply}
        >
          댓글 달기
        </TextInput>
        <SubmitBtn disabled={!active}>등록</SubmitBtn>
      </form>
      <div className="article-reply">
        <ArticleReply />
      </div>
    </div>
  );
}
