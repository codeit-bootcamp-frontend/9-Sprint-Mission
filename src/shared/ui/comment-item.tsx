import React from "react";
import styled from "styled-components";
import { formatRelativeTime } from "../lib/formatRelativeTime";
import { CommentItemProps } from "../types/comment-item-props";
import DropdownMenu from "./dropdown-menu";
import { ReactComponent as KebabIcon } from "../assets/images/icons/ic_kebab.svg";
import { ReactComponent as ProfileIcon } from "../assets/images/icons/ic_profile.svg";

// Styled Components
const CommentWrapper = styled.div`
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
`;

const CommentProfileIcon = styled(ProfileIcon)`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

const CommentImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 50%; /* 프로필 이미지를 둥글게 처리 */
`;

const CommentContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const CommentUser = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-right: auto;
`;

const CommentKebabContainer = styled.div`
  position: relative;
`;

const CommentKebabIcon = styled(KebabIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CommentContent = styled.div`
  font-size: 14px;
  color: #111827;
  line-height: 1.5;
`;

// Component Function
const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  dropdownVisible,
  toggleDropdown,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <CommentWrapper>
      {!comment.writer.image ? (
        <CommentProfileIcon />
      ) : (
        <CommentImage src={comment.writer.image} alt="profile" />
      )}
      <CommentContentContainer>
        <CommentHeader>
          <CommentUser>{comment.writer.nickname}</CommentUser>
          <CommentTime>{formatRelativeTime(comment.updatedAt)}</CommentTime>
          <CommentKebabContainer>
            <CommentKebabIcon onClick={() => toggleDropdown(comment.id)} />
            {dropdownVisible === comment.id && (
              <DropdownMenu>
                <DropdownMenu.Item
                  label="수정하기"
                  onClick={() => handleEditClick(comment.id)} // 함수 참조 전달
                />
                <DropdownMenu.Item
                  label="삭제하기"
                  onClick={() => handleDeleteClick(comment.id)} // 함수 참조 전달
                />
              </DropdownMenu>
            )}
          </CommentKebabContainer>
        </CommentHeader>
        <CommentContent>{comment.content}</CommentContent>
      </CommentContentContainer>
    </CommentWrapper>
  );
};

export default CommentItem;
