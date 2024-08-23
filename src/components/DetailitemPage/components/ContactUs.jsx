import styled from "styled-components";
import Avatar from "./Avatar";
import { useState } from "react";

const Inquiry = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${(props) => props.theme.gray800};
`;

const Button = styled.button``;

const ContactUs = ({ content, onUpdate, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewtitle] = useState(content.title);

  const onClickDelete = () => {
    onDelete(content.id);
  };

  console.log(content.id);

  const onClickUpdate = () => {
    onUpdate(content.id, newTitle);
    setEdit(false);
  };

  const onChangeInput = (e) => {
    setNewtitle(e.target.value);
  };

  const onClickEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <section className="ContactUs">
      {edit ? (
        <>
          <input type="text" value={newTitle} onChange={onChangeInput} />
          <button onClick={onClickUpdate}>확인</button>
          <button onClick={onClickEdit}>취소</button>
        </>
      ) : (
        <>
          <Inquiry>{content}</Inquiry>
          <Avatar text="Avatar" userName="총명한 판다" date="1시간 전" />
          <Button type="button" onClick={onClickEdit}>
            수정하기
          </Button>
          <Button type="button" onClick={onClickDelete}>
            삭제하기
          </Button>
        </>
      )}
    </section>
  );
};

export default ContactUs;
