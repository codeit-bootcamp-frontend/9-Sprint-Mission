import styled from "styled-components";
import gobackbutton from "../../../assets/images/icons/goback.png";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  font-size: 18px;
  color: white;
  margin: 0 auto;
  background-color: #3692ff;
  border-radius: 40px;
  padding: 12px 64px;
  white-space: nowrap;

  img {
    margin-left: 8px; /* 아이콘과 텍스트 사이에 간격 추가 */
  }
`;

export function BackToProductListButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/items");
  };

  return (
    <Button onClick={handleClick}>
      <span>목록으로 돌아가기</span>
      <img src={gobackbutton} alt="Go back icon" />
    </Button>
  );
}
