import styled from "styled-components";

const S = {};

S.TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  background-color: #f3f4f6;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  padding: 16px 24px;
  resize: none;
`;

S.AuthorProfile = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 24px;
  flex-grow: 1;
`;

S.ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-200);
  border-radius: 50%;
`;

S.ProfileDetails = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;

S.CancleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 47px;
  border: 1px solid transparent;
  font-size: 14px;
  color: var(--gray-300);
`;

S.ConfirmButton = styled.button`
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

export default S;
