import { ChangeEvent, MouseEvent, useState } from "react";
import { ArticleComments } from "@/types/article";
import CommentButtonImg from "@/assets/images/icons/ic_kebab.svg";
import Image from "next/image";
import styles from "./Comment.module.scss";
import Button from "../Button/Button";
import InputItem from "../InputItem";
import Profile from "../Profile";
import Date from "../Date";
import { LineDividerWidth } from "../CommonStyles";
import axios from "@/api/axios";

interface Props {
  comment: ArticleComments;
  onUpdate: (commentId: number, newContent: string) => void;
  onDelete: (commentId: number) => void;
}

const Comment = ({ comment, onUpdate, onDelete }: Props) => {
  const [edit, setEdit] = useState(false);
  const [commentButton, setCommentButton] = useState(false);
  const [newComment, setNewComment] = useState(comment.content);

  const handleClickUpdate = () => {
    if (newComment.trim()) {
      // 빈 댓글 내용 방지
      onUpdate(comment.id, newComment);
      setEdit(false); // 수정 모드 종료
    }
  };

  const handleClickDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.delete(`/comments/${comment.id}`); // 댓글 삭제 요청
      onDelete(comment.id); // UI에서 댓글 삭제
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  const handleClickEdit = () => {
    setEdit((prev) => !prev); // 수정 모드 토글
    setCommentButton(false); // 버튼 표시 상태 초기화
  };

  const handleChangeComment = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewComment(e.target.value); // 댓글 내용 업데이트
  };

  const onClickCommentButton = () => {
    setCommentButton((prev) => !prev); // 버튼 표시 상태 토글
  };

  return (
    <section className={styles.Comment}>
      {edit ? (
        <>
          <InputItem
            id="Comment"
            value={newComment}
            type="text"
            onChange={handleChangeComment}
            placeholder="댓글을 입력해주세요."
            isTextArea
          />
          <div className={styles.buttonWrapper}>
            <Button onClick={handleClickEdit}>취소</Button>
            <Button onClick={handleClickUpdate}>수정완료</Button>
          </div>
        </>
      ) : (
        <>
          <h4 className={styles.content}>{comment.content}</h4>
          <button
            className={styles.commentButton}
            onClick={onClickCommentButton}
          >
            <Image
              src={CommentButtonImg}
              width={24}
              height={24}
              alt="CommentButtonImg"
            />
          </button>
          {commentButton ? (
            <div className={styles.buttonBox}>
              <button
                className={styles.editButton}
                type="button"
                onClick={handleClickEdit}
              >
                수정하기
              </button>
              <button
                className={styles.editButton}
                type="button"
                onClick={handleClickDelete}
              >
                삭제하기
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
      <div className={styles.profile}>
        <Profile
          nickname={comment.writer.nickname}
          ProfileImage={comment.writer.image}
          size={40}
        >
          <Date date={comment.updatedAt} />
        </Profile>
      </div>
      <LineDividerWidth />
    </section>
  );
};

export default Comment;
