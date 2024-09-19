import styled from "styled-components";
import profileImage from "../../../assets/images/logo/profile.png";

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

const ConfirmButton = styled.div`
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
export function CommentEditBox({ info }) {
  return (
    <>
      <TextArea />
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
          <span style={{ fontSize: "14px", color: "#737373" }}>취소</span>
          <ConfirmButton>수정 완료</ConfirmButton>
        </div>
      </div>
    </>
  );
}
