import React, { FormEvent, useEffect, useState } from "react";
import { createComments } from "../../Api";
import styles from "./DetailComments.module.css";
import emptyImg from "../../images/Img_inquiry_empty.png";

interface DetailCommentsProps {
  productId: string | undefined;
}

interface CommentWriter {
  image: string;
  nickname: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  writer: CommentWriter;
}

const DetailComments: React.FC<DetailCommentsProps> = ({ productId }) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/products/${productId}/comments?limit=5`
        );
        const data = await response.json();
        setComments(data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createComments(productId, commentText);
      setCommentText(""); // 제출 후 입력 필드를 초기화
    } catch (error) {
      console.error("댓글 제출 중 오류 발생", error);
    }
  };

  return (
    <div className={styles["comment-wrap"]}>
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <label htmlFor="contact">문의하기</label>
        <textarea
          id="contact"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.
"
        />
        <div className={styles["btn-wrap"]}>
          <button
            type="submit"
            className={styles["btn-contact"]}
            disabled={!commentText.trim()}
          >
            등록
          </button>
        </div>
      </form>
      <div className={styles["comments-list"]}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className={styles["comment-item"]}>
              <div className={styles["comment-header"]}>
                <p className={styles["comment-content"]}>{comment.content}</p>
              </div>
              <div className={styles["comment-writer"]}>
                <div className={styles["comment-avatar"]}>
                  <img
                    src={comment.writer.image}
                    alt={comment.writer.nickname}
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className={styles["comment-nickname"]}>
                    {comment.writer.nickname}
                  </p>
                  <p className={styles["comment-date"]}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles["comment-empty"]}>
            <div className={styles["empty-img"]}>
              <img
                src={emptyImg}
                width={196}
                height={196}
                alt="empty-comments"
              />
            </div>
            <p className={styles["empty-txt"]}>아직 문의가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailComments;
