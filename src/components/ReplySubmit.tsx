import { ChangeEvent, useState } from "react";
import styles from "./styles/ItemEachReply.module.css";

//useParam으로 가져온 id
export function ReplySubmit({ id }: { id: string | undefined }) {
  const [content, setContent] = useState("");
  /*
  const handleSubmitReply = (id) => {
    // 댓글 등록 api
    //if 댓글 등록 성공 시 인풋 초기화
    setContent("");
  };
*/
  const handleChangeReplyContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  return (
    <>
      <div>
        <form
          action="#"
          className={styles.replyForm}
          // onSubmit={handleSubmitReply}
        >
          <label htmlFor="reply" className={styles.replyLabel}>
            문의하기
          </label>
          <textarea
            id="reply"
            className={styles.replyTextarea}
            value={content}
            onChange={handleChangeReplyContent}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          ></textarea>
          <button
            className={styles.replySubmitBtn}
            disabled={content ? false : true}
            type="submit"
          >
            등록
          </button>
        </form>
      </div>
    </>
  );
}
