import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import profileImg from "../../../assets/profile.svg";
import styled from "styled-components";
function Profile({ src, nickname, timeAgo }) {
    return (_jsxs(ProfileContainer, { children: [_jsx(ProfileImg, { src: src || profileImg, alt: "\uD504\uB85C\uD544", width: "32", height: "32" }), _jsxs(ProfileInfo, { children: [_jsx(ProfileNickName, { children: nickname }), _jsx(ProfileTimeAge, { children: timeAgo })] })] }));
}
export default Profile;
const ProfileContainer = styled.div `
  font-size: 12px;
  display: flex;
  gap: 8px;
`;
const ProfileImg = styled.img `
  border-radius: 9999px;
`;
const ProfileInfo = styled.div `
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ProfileNickName = styled.span `
  color: #4b5563;
`;
const ProfileTimeAge = styled.p `
  margin: 0;
  color: #9ca3af;
`;
