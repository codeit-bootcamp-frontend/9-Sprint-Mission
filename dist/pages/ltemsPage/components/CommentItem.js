import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "styled-components";
import Profile from "./Profile";
import DropDownImg from "../../../components/DropDownImg";
import { timeAgoFormat } from "../../../utils/timeAgoFormat";
import Button from "../../../components/Button";
import { useState } from "react";
function CommentItem({ item, onDelete }) {
    const [edit, setEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(item.content);
    const timeAgo = timeAgoFormat(item.createdAt);
    const handleUpdateClick = () => {
        setIsEditing(true);
        setEdit(false);
    };
    const handleSaveClick = () => {
        setIsEditing(false);
    };
    const handleCancelClick = () => {
        setIsEditing(false);
        setContent(item.content); // 수정 취소 시 원래 내용으로 복구
    };
    const handleDeleteClick = () => {
        onDelete(item.id);
        setEdit(false);
    };
    return (_jsx(CommentItemWrapper, { children: isEditing ? (_jsxs(_Fragment, { children: [_jsx(EditBox, { value: content, onChange: (e) => setContent(e.target.value) }), _jsxs(EditButtons, { children: [_jsx(Button, { color: "#000", background: "#fff", onClick: handleCancelClick, children: "\uCDE8\uC18C" }), _jsx(Button, { onClick: handleSaveClick, children: "\uC218\uC815\uC644\uB8CC" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs(CommentItemTop, { children: [_jsx(CommentContent, { children: content }), item.writer.id === 999 && (_jsxs(DropdownWrapper, { onClick: () => setEdit(!edit), children: [_jsx(DropDownImg, {}), edit && (_jsxs(DropdownSection, { children: [_jsx(DropdownItem, { onClick: handleUpdateClick, children: "\uC218\uC815\uD558\uAE30" }), _jsx(DropdownItem, { onClick: handleDeleteClick, children: "\uC0AD\uC81C\uD558\uAE30" })] }))] }))] }), _jsx(Profile, { src: item.writer.image, nickname: item.writer.nickname, timeAgo: timeAgo })] })) }));
}
export default CommentItem;
const CommentItemWrapper = styled.div `
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
`;
const CommentItemTop = styled.div `
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const CommentContent = styled.p `
  margin: 0;
  font-size: 14px;
  color: #1f2937;
`;
const DropdownWrapper = styled.div `
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  gap: 10px;
`;
const DropdownSection = styled.div `
  width: 139px;
  padding: 8px 0;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fff;
`;
const DropdownItem = styled.div `
  font-size: 16px;
  color: #6b7280;
  padding: 8px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;
const EditBox = styled.textarea `
  width: 100%;
  background-color: #f3f4f6;
  height: 80px;
  border: 0;
  border-radius: 12px;
  outline: none;
  padding: 16px;
  margin-bottom: 16px;
  resize: none;
`;
const EditButtons = styled.div `
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
`;
