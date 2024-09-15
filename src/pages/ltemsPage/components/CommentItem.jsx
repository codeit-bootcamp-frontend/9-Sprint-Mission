import styled from "styled-components";
import Profile from "./Profile";
import { useState } from "react";
import DropDownImg from "../../../components/DropDownImg";
import { timeAgoFormat } from "../../../utils/timeAgoFormat";
import Button from "../../../components/Button";

function CommentItem({ item, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const timeAgo = timeAgoFormat(item.createdAt);

  const handleUpdateClick = () => {
    setIsEditing(true);
    setEdit(false);
  };

  const handleSaveClick = () => {
    item.content = editedContent;
    item.updatedAt = new Date().toISOString();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(item.content);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
    setEdit(false);
  };

  return (
    <CommentItemWrapper>
      {isEditing ? (
        <>
          <EditBox
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <EditButtons>
            <Button color="#000" background="#fff" onClick={handleCancelClick}>
              취소
            </Button>
            <Button isEdit onClick={handleSaveClick}>
              수정완료
            </Button>
          </EditButtons>
        </>
      ) : (
        <>
          <CommentItemTop>
            <CommentContent>{item.content}</CommentContent>
            {item.writer.id === 999 && (
              <DropdownWrapper onClick={() => setEdit(!edit)}>
                <DropDownImg />
                {edit && (
                  <DropdownSection>
                    <DropdownItem isUpdate onClick={handleUpdateClick}>
                      수정하기
                    </DropdownItem>
                    <DropdownItem onClick={handleDeleteClick}>
                      삭제하기
                    </DropdownItem>
                  </DropdownSection>
                )}
              </DropdownWrapper>
            )}
          </CommentItemTop>
          <Profile
            src={item.writer.image}
            nickname={item.writer.nickname}
            timeAgo={timeAgo}
          />
        </>
      )}
    </CommentItemWrapper>
  );
}

export default CommentItem;

const CommentItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
`;

const CommentItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CommentContent = styled.p`
  margin: 0;
  font-size: 14px;
  color: #1f2937;
`;

const DropdownWrapper = styled.div`
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

const DropdownSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 139px;
  height: 92px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fff;
`;

const DropdownItem = styled.span`
  font-size: 16px;
  color: #6b7280;
  text-align: center;
  padding: ${(props) => (props.isUpdate ? "12px 0 8px" : "8px 0 12px")};
  border-radius: ${(props) => (props.isUpdate ? "8px 8px 0 0" : "0")};
  cursor: pointer;
`;

const EditBox = styled.input`
  width: 100%;
  background-color: #f3f4f6;
  height: 80px;
  border: 0;
  border-radius: 12px;
  outline: none;
  padding: 16px 0 40px 24px;
  margin-bottom: 16px;
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
`;
