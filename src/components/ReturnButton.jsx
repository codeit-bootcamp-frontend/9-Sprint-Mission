import styled from "styled-components";
import arrowImg from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

function ReturnButton() {
  const nav = useNavigate();
  return (
    <ReturnButtonContainer>
      <StyledReturnButton onClick={() => nav(-1)}>
        <ReturnButtonFont>목록으로 돌아가기</ReturnButtonFont>
        <img src={arrowImg} alt="" width="24" height="24" />
      </StyledReturnButton>
    </ReturnButtonContainer>
  );
}

export default ReturnButton;

const ReturnButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledReturnButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: #3692ff;
  padding: 12px 64px;
  border-radius: 40px;
  border: 0;
  cursor: pointer;
  outline: none;
`;

const ReturnButtonFont = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #f3f4f6;
`;
