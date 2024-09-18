import styled from "styled-components";
import Profile from "./Profile";
import DropDownImg from "../../../components/DropDownImg";
import { timeAgoFormat } from "../../../utils/timeAgoFormat";
import Button from "../../../components/Button";
import { useState } from "react";
import { CommentData } from "../../../types/types";

interface CommentItemProps {
  item: CommentData;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

function CommentItem({ item, onEdit, onDelete }: CommentItemProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(item.content);
  const timeAgo = timeAgoFormat(item.createdAt);

  const handleUpdateClick = () => {
    setIsEditing(true);
    setEdit(false);
  };

  const handleSaveClick = () => {
    onEdit(item.id, editedContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(item.content); // 취소 시 원래 내용 복원
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
    setEdit(false); // 삭제 후 드롭다운 닫기
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
            <Button onClick={handleSaveClick}>수정완료</Button>
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
                    <DropdownItem onClick={handleUpdateClick}>
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
  width: 139px;
  padding: 8px 0;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fff;
`;

const DropdownItem = styled.div`
  font-size: 16px;
  color: #6b7280;
  padding: 8px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const EditBox = styled.textarea`
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

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
`;
