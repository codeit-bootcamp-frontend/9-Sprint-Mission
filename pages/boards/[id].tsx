import ArticleReply from "@/components/ArticleReply";
import ArticleView from "@/components/ArticleView";
import Button from "@/components/Button";
import SubmitBtn from "@/components/SubmitBtn";
import { TextInput } from "@/components/TextInput";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./id.module.css";

export default function Article() {
  const [replyValue, setReplyValue] = useState<string>("");
  const handleChangeReply = (e: ChangeEvent<HTMLInputElement>) => {
    const newReply = e.target.value;
    setReplyValue(newReply);
  };

  let active = false;
  if (replyValue !== "") active = true;

  const handleReplySubmit = (e: FormEvent<HTMLFormElement>) => {
    // 댓글 등록 api
  };
  return (
    <div className={`container ${styles.wrapper}`}>
      <ArticleView />
      <form className={styles.form} onSubmit={handleReplySubmit}>
        <TextInput
          label="reply"
          placeholder="댓글을 입력해주세요"
          required
          value={replyValue}
          onChange={handleChangeReply}
        >
          댓글 달기
        </TextInput>
        <div className={styles.SubmitBtn}>
          <SubmitBtn disabled={!active}>등록</SubmitBtn>
        </div>
      </form>
      <div className="article-reply">
        <ArticleReply />
      </div>
      <div className={styles["goback-btn"]}>
        <Button>목록으로 돌아가기</Button>
      </div>
    </div>
  );
}
