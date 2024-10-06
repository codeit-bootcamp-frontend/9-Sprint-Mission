import { FormEvent, useState } from "react";
import { postArticleComments, patchArticleComments } from "@/api/article";
import { Article, ArticleComments } from "@/types/article";
import styles from "./ArticleDetail.module.scss";
import Image from "next/image";
import CommentButtonImg from "@/assets/images/icons/ic_kebab.svg";
import LikeButton from "@/components/UI/Button/LikeButton";
import InputItem from "@/components/UI/InputItem";
import Button from "@/components/UI/Button/Button";
import Profile from "@/components/UI/Profile";
import Comment from "@/components/UI/comments/Comment";
import { FormatDate } from "@/components/UI/Date";
import {
  LineDividerWidth,
  LineDividerHieght,
  SectionTitle,
} from "@/components/UI/CommonStyles";
import EnquiryEmpty from "@/components/UI/EnquiryEmpty";

interface Props {
  articles: Article;
  comments: ArticleComments[];
}

const ArticleDetail = ({ articles, comments }: Props) => {
  const [articleComments, setArticleComments] =
    useState<ArticleComments[]>(comments);
  const [commentContent, setCommentContent] = useState("");

  // 댓글 등록
  const onSubmit = async (articleId: number, content: string) => {
    try {
      const { data } = await postArticleComments({ articleId, content });
      setArticleComments((prev) => [...prev, data]); // 댓글 추가
    } catch (error) {
      console.error("댓글 등록 오류:", error);
    }
  };

  // 댓글 삭제
  const onDelete = (commentId: number) => {
    setArticleComments(
      articleComments.filter(
        (comment) => Number(comment.id) !== Number(commentId)
      )
    );
  };

  // 댓글 수정
  const onUpdate = async (commentId: number, content: string) => {
    try {
      const updatedComment = await patchArticleComments({
        commentId,
        content,
      });
      setArticleComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment.content : comment
        )
      );
    } catch (error) {
      console.error("댓글 업데이트 오류:", error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentContent) {
      onSubmit(articles.id, commentContent); // 게시글 ID와 함께 댓글 내용 제출
      setCommentContent("");
    }
  };

  return (
    <div className={styles.articleDetail}>
      <div className={styles.articleDetailTop}>
        <div className={styles.articleTitleWrapper}>
          <SectionTitle>{articles.title}</SectionTitle>
          <button>
            <Image
              src={CommentButtonImg}
              width={24}
              height={24}
              alt="CommentButtonImg"
            />
          </button>
        </div>
        <div className={styles.articleDetailMeta}>
          <Profile nickname={articles.writer.nickname} size={24} />
          <FormatDate date={articles.createdAt} />
          <LineDividerHieght />
          <LikeButton
            likeCount={articles.likeCount}
            size={24}
            borderRadius
            fontSize="large"
          />
        </div>
        <LineDividerWidth />
        <p className={styles.content}>{articles.content}</p>
      </div>

      <div className={styles.articleDetailBottom}>
        <form className={styles.CommentForm} onSubmit={handleSubmit}>
          <InputItem
            label="댓글 달기"
            id="article"
            value={commentContent}
            type="text"
            onChange={(e) => setCommentContent(e.target.value)} // 댓글 내용 변경
            placeholder="댓글을 입력해주세요."
            isTextArea
          />
          <Button type="submit" disabled={!commentContent}>
            등록
          </Button>
        </form>

        {comments.length > 0 ? (
          <>
            {comments &&
              comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))}
          </>
        ) : (
          <EnquiryEmpty />
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
