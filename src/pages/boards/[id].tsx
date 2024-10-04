import axios from "axios";
import type { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import styles from "./ArticleDetail.module.scss";
import { getArticleDetail, getArticleComments } from "@/api/article";
import { Article, ArticleComments } from "@/types/article";
import Date from "@/components/UI/Date";
import LikeButton from "@/components/UI/Button/LikeButton";
import InputItem from "@/components/UI/InputItem";
import Button from "@/components/UI/Button/Button";
import Profile from "@/components/UI/Profile";
import Comment from "@/components/UI/comments/Comment";
import {
  LineDividerWidth,
  LineDividerHieght,
  SectionTitle,
} from "@/components/UI/CommonStyles";
import EnquiryEmpty from "@/components/UI/EnquiryEmpty";

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const articleId = Number(context.params?.id);

  let articles;
  let comments;

  try {
    if (articleId !== undefined) {
      articles = await getArticleDetail(articleId);
    }
  } catch {
    return {
      notFound: true,
    };
  }

  try {
    const data = await getArticleComments({ articleId, limit: 10, cursor: 0 });
    comments = data.list ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.status, error.message);
    } else {
      throw new Error("에러가 발생했습니다.");
    }
  }

  return {
    props: { articles, comments },
  };
}) satisfies GetServerSideProps<{ articles: Article }>;

interface Props {
  articles: Article;
  comments: ArticleComments[];
}

const ArticleDetail = ({ articles, comments }: Props) => {
  const [articleComments, setArticleComments] =
    useState<ArticleComments[]>(comments);
  const [commentContent, setCommentContent] = useState("");

  const onSubmit = async (articleId: number, content: string) => {
    try {
      const { data } = await axios.post(
        `/articles/${articleId}/comments`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 새 댓글 추가
      setArticleComments((prev) => [...prev, data]); // 댓글 추가
    } catch (error) {
      console.error("댓글 등록 오류:", error);
    }
  };

  const onDelete = (commentId: number) => {
    setArticleComments(
      articleComments.filter(
        (comment) => Number(comment.id) !== Number(commentId)
      )
    );
  };

  const onUpdate = async (commentId: number, newContent: string) => {
    try {
      const updatedComment = await axios.patch(`/comments/${commentId}`, {
        content: newContent,
      });
      setArticleComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updatedComment.data : comment
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
      setCommentContent(""); // 입력 필드 초기화
    }
  };

  return (
    <section className="container">
      <div className={styles.articleDetailTop}>
        <SectionTitle>{articles.title}</SectionTitle>
        <div className={styles.articleDetailMeta}>
          <Profile nickname={articles.writer.nickname} size={40} />
          <Date date={articles.updatedAt} />
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
            label="댓글달기"
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
    </section>
  );
};

export default ArticleDetail;
