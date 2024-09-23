import styled from "styled-components";
import Avatar from "./Avatar";
import { MouseEvent, useState } from "react";
import { Textarea } from "../CommentsSection";
import { Button } from "../../AdditemPage/components/AdditemForm";
import CommentButtonImg from "../../../assets/images/icon/ic_kebab.svg";
import { ChangeEvent } from "react";
import { Comments } from "../../Types/Types";

interface Props {
  comment: Comments;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const Comment = ({ comment, onUpdate, onDelete }: Props) => {
  const [edit, setEdit] = useState(false);
  const [commentButton, setCommentButton] = useState(false);
  const [newComment, setNewComment] = useState(comment.content);

  const { id, content, updatedAt, writer } = comment;

  const handleClickUpdate = () => {
    onUpdate(id, newComment);
    setEdit(false); // 수정 모드 종료
  };

  const handleClickDelete = () => {
    onDelete(id); // 댓글 삭제
  };

  const handleClickEdit = () => {
    setEdit((prev) => !prev); // 수정 모드 토글
    setCommentButton(false); // 버튼 표시 상태 초기화
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value); // 댓글 내용 업데이트
  };

  const onClickCommentButton = () => {
    setCommentButton((prev) => !prev); // 버튼 표시 상태 토글
  };

  return (
    <section className="Comment">
      {edit ? (
        <>
          <Textarea
            height="edit"
            value={newComment}
            onChange={handleChangeTextarea}
          />
          <div className="Button-wrap">
            <CancleButton onClick={handleClickEdit}>취소</CancleButton>
            <Button onClick={handleClickUpdate}>수정완료</Button>
          </div>
        </>
      ) : (
        <>
          <Inquiry>{content}</Inquiry>
          <CommentButton onClick={onClickCommentButton}>
            <img src={CommentButtonImg} alt="CommentButtonImg" />
          </CommentButton>
          {commentButton ? (
            <ButtonBox>
              <EditButton type="button" onClick={handleClickEdit}>
                수정하기
              </EditButton>
              <EditButton type="button" onClick={handleClickDelete}>
                삭제하기
              </EditButton>
            </ButtonBox>
          ) : (
            ""
          )}
        </>
      )}
      <Avatar
        text={writer.nickname}
        image={writer.image}
        userName={writer.nickname}
        date={updatedAt}
      />
    </section>
  );
};

export default Comment;

const Inquiry = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${({ theme }) => theme.gray800};
  margin-bottom: 2rem;
`;

const ButtonBox = styled.div`
  width: fit-content;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-left: auto;
  position: absolute;
  right: 0;
  top: 30px;
`;

const EditButton = styled.button`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px 30px;
  display: block;
`;

const CancleButton = styled(Button)`
  background-color: #ffffff;
  color: ${({ theme }) => theme.gray500};
`;

const CommentButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
`;
