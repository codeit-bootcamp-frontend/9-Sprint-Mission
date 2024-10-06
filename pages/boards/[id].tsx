import CreatedDate from "@/components/CreatedDate";
import LikeCountBox from "@/components/LikeCountBox";
import UserNickname from "@/components/UserNickname";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/board.module.css";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Articles, Comments } from "@/types/types";
import timeDiff from "@/utils/timeDiff";
import Button from "@/components/Button";
import Link from "next/link";

export default function Board() {
  const router = useRouter();
  const id = router.query["id"];

  const [article, setArticle] = useState<Articles>();
  const [comments, setComments] = useState<Comments[]>();
  const [textAreaValue, setTextAreaValue] = useState("");

  async function getArticle(targetId: number) {
    const res = await axios.get(`/articles/${targetId}`);
    const article = res.data;
    setArticle(article);
  }

  async function getArticleComments(targetId: number) {
    const res = await axios.get(`/articles/${targetId}/comments?limit=3`);
    const comments = res.data.list;
    setComments(comments);
  }

  useEffect(() => {
    if (id) {
      getArticle(+id);
      getArticleComments(+id);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextAreaValue(e.target.value);
  };

  return (
    <div className={styles["comment-page-container"]}>
      <section className={styles["article-container"]}>
        {article && (
          <>
            <div className={styles["title-container"]}>
              <div className={styles.title}>{article.title}</div>
              <div className={styles["kebab-container"]}>
                <Image src="/ic_kebab.png" width={24} height={24} alt="" />
              </div>
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["user-info-container"]}>
                <Image
                  src={article.image}
                  alt=""
                  width={32}
                  height={33}
                  className={styles.img}
                />
                <UserNickname className={styles["user-nickname"]}>
                  {article.writer.nickname}
                </UserNickname>
                <CreatedDate className={styles["created-at"]}>
                  {timeDiff(article.createdAt)}
                </CreatedDate>
              </div>
              <LikeCountBox>{article.likeCount}</LikeCountBox>
            </div>
            <div className={styles.content}>{article.content}</div>
          </>
        )}
        <div className={styles["comment-container"]}>
          <label htmlFor="comment">댓글달기</label>
          <textarea
            value={textAreaValue}
            id="comment"
            placeholder="댓글을 입력해주세요."
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles["btn-container"]}>
          <Button color={textAreaValue ? "blue" : "gray"}>등록</Button>
        </div>
      </section>
      <section className={styles["comments-container"]}>
        <ul className={styles["writer-comment-container"]}>
          {comments ? (
            comments.map((comment) => (
              <li key={comment.id}>
                <div className={styles["writer-comment-title-container"]}>
                  <div className={styles["writer-comment-title"]}>
                    {comment.content}
                  </div>
                  <Image src="/ic_kebab.png" width={24} height={24} alt="" />
                </div>
                <div className={styles["writer-info-container"]}>
                  <Image
                    src={
                      comment.writer.image
                        ? comment.writer.image
                        : "/ic_profile.png"
                    }
                    width={32}
                    height={32}
                    alt=""
                  />
                  <div className={styles["writer-container"]}>
                    <UserNickname className={styles["writer-nickname"]}>
                      {comment.writer.nickname}
                    </UserNickname>
                    <CreatedDate className={styles["writer-created-at"]}>
                      {timeDiff(comment.createdAt)}
                    </CreatedDate>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className={styles["no-comments"]}>
              <Image
                src="/img_reply_empty.png"
                width={140}
                height={140}
                alt=""
                className={styles["no-comments-img"]}
              />
              <p>아직 댓글이 없어요.</p>
              <p>지금 댓글을 달아보세요!.</p>
            </div>
          )}
        </ul>
        <div className={styles["link-container"]}>
          <Link href="/boards" className={styles["prev-btn"]}>
            목록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
