import styled from "styled-components";
import Avatar from "./Avatar";
import { useState } from "react";
import { Textarea } from "../CommentsSection";
import { Button } from "../../AdditemPage/components/AdditemForm";
import KebabImg from "../../../assets/images/icon/ic_kebab.svg";

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

const KebabButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
`;

const Comment = ({ comment, onUpdate, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [kebab, setKebab] = useState(false);
  const [newComment, setNewComment] = useState(comment.content);

  const { id, content, updatedAt, writer } = comment;

  const handleClickUpdate = () => {
    onUpdate(id, newComment);
    setEdit(false);
  };

  const handleClickDelete = () => {
    onDelete(id);
  };

  const handleClickEdit = () => {
    setEdit((prev) => !prev);
    setKebab(false);
  };

  const handleChangeInput = (e) => {
    setNewComment(e.target.value);
  };

  const onClickKebab = () => {
    setKebab(!kebab);
  };

  return (
    <section className="Comment">
      {edit ? (
        <>
          <Textarea
            height="edit"
            type="text"
            value={newComment}
            onChange={handleChangeInput}
          />
          <div className="Button-wrap">
            <CancleButton onClick={handleClickEdit}>취소</CancleButton>
            <Button onClick={handleClickUpdate}>수정완료</Button>
          </div>
        </>
      ) : (
        <>
          <Inquiry>{content}</Inquiry>
          <KebabButton onClick={onClickKebab}>
            <img src={KebabImg} alt="KebabImg" />
          </KebabButton>
          {kebab ? (
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
        text="Avatar"
        image={writer.image}
        userName={writer.nickname}
        date={updatedAt.slice(0, 10)}
      />
    </section>
  );
};

export default Comment;
