import profileImg from "../../../assets/profile.svg";
import styled from "styled-components";

function Profile({ src, nickname, createdAt, timeAgo }) {
  return (
    <ProfileContainer>
      <ProfileImg src={src || profileImg} alt="프로필" width="32" height="32" />
      <ProfileInfo>
        <ProfileNickName>{nickname}</ProfileNickName>
        {!createdAt ? (
          <ProfileTimeAge>{timeAgo}</ProfileTimeAge>
        ) : (
          <ProfileTimeAge>{new Date().toLocaleDateString()}</ProfileTimeAge>
        )}
      </ProfileInfo>
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  font-size: 12px;
  display: flex;
  gap: 8px;
`;

const ProfileImg = styled.img`
  border-radius: 9999px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileNickName = styled.span`
  color: #4b5563;
`;

const ProfileTimeAge = styled.p`
  margin: 0;
  color: #9ca3af;
`;
