import styled from "styled-components";
import AvatarImg from "../../../assets/images/icon/login.svg";

const AvatarStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
`;

const UserName = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

const UserDate = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #9ca3af;
`;

const Avatar = ({ text, userName, date }) => {
  return (
    <AvatarStyle>
      <UserImg src={AvatarImg} alt={text} />
      <div>
        <UserName>{userName}</UserName>
        <UserDate>{date}</UserDate>
      </div>
    </AvatarStyle>
  );
};

export default Avatar;
