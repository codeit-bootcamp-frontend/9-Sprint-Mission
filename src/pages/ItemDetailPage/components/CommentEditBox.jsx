import styled from "styled-components";
import profileImage from "../../../assets/images/logo/profile.png";
import { useState } from "react";

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  background-color: #f3f4f6;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  padding: 16px 24px;
  resize: none;
`;

const AuthorProfile = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 24px;
  flex-grow: 1;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-200);
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;

const CancleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 47px;
  border: 1px solid transparent;
  font-size: 14px;
  color: var(--gray-300);
`;

const ConfirmButton = styled.button`
  width: 106px;
  height: 42px;
  margin-left: 20px;
  border-radius: 8px;
  padding: 12px 23px;
  background-color: var(--blue);
  color: white;
  font-size: 14px;
  text-align: center;
`;
export function CommentEditBox({ info, onClick, onSubmit }) {
  const [editContent, setEditContent] = useState(info.content);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editContent); // 새로운 내용을 부모 컴포넌트로 전달
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        value={editContent}
        onChange={handleEditChange}
        placeholder="내용을 입력하세요"
      />
      <div style={{ display: "flex" }}>
        <AuthorProfile>
          <ProfileImage>
            <img src={info.writer.image ?? profileImage} alt="Author Profile" />
          </ProfileImage>
          <ProfileDetails>
            <div style={{ fontSize: "14px" }}>{info.writer.nickname}</div>
            <div style={{ color: "#9CA3AF" }}>
              {info.updatedAt.slice(0, 10)}
            </div>
          </ProfileDetails>
        </AuthorProfile>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CancleButton onClick={onClick}>취소</CancleButton>
          <ConfirmButton type="submit">수정 완료</ConfirmButton>
        </div>
      </div>
    </form>
  );
}
