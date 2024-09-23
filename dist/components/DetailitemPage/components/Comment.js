import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
import Avatar from "./Avatar";
import { useState } from "react";
import { Textarea } from "../CommentsSection";
import { Button } from "../../AdditemPage/components/AdditemForm";
import CommentButtonImg from "../../../assets/images/icon/ic_kebab.svg";
const Comment = ({ comment, onUpdate, onDelete }) => {
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
    const handleChangeTextarea = (e) => {
        setNewComment(e.target.value); // 댓글 내용 업데이트
    };
    const onClickCommentButton = () => {
        setCommentButton((prev) => !prev); // 버튼 표시 상태 토글
    };
    return (_jsxs("section", { className: "Comment", children: [edit ? (_jsxs(_Fragment, { children: [_jsx(Textarea, { height: "edit", value: newComment, onChange: handleChangeTextarea }), _jsxs("div", { className: "Button-wrap", children: [_jsx(CancleButton, { onClick: handleClickEdit, children: "\uCDE8\uC18C" }), _jsx(Button, { onClick: handleClickUpdate, children: "\uC218\uC815\uC644\uB8CC" })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Inquiry, { children: content }), _jsx(CommentButton, { onClick: onClickCommentButton, children: _jsx("img", { src: CommentButtonImg, alt: "CommentButtonImg" }) }), commentButton ? (_jsxs(ButtonBox, { children: [_jsx(EditButton, { type: "button", onClick: handleClickEdit, children: "\uC218\uC815\uD558\uAE30" }), _jsx(EditButton, { type: "button", onClick: handleClickDelete, children: "\uC0AD\uC81C\uD558\uAE30" })] })) : ("")] })), _jsx(Avatar, { text: writer.nickname, image: writer.image, userName: writer.nickname, date: updatedAt })] }));
};
export default Comment;
const Inquiry = styled.p `
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: ${({ theme }) => theme.gray800};
  margin-bottom: 2rem;
`;
const ButtonBox = styled.div `
  width: fit-content;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-left: auto;
  position: absolute;
  right: 0;
  top: 30px;
`;
const EditButton = styled.button `
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 12px 30px;
  display: block;
`;
const CancleButton = styled(Button) `
  background-color: #ffffff;
  color: ${({ theme }) => theme.gray500};
`;
const CommentButton = styled.button `
  position: absolute;
  right: 0;
  top: 0;
  background: transparent;
`;
