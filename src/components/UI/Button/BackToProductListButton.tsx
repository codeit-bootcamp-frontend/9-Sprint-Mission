import styled from "styled-components";
import gobackbutton from "../../../../assets/images/icons/goback.png";

// Button 스타일 정의
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
    margin-left: 8px;
  }
`;

// Props 타입 정의
interface BackToProductListButtonProps {
  onClick: () => void;
}

export function BackToProductListButton({
  onClick,
}: BackToProductListButtonProps) {
  return (
    <Button onClick={onClick}>
      <span>목록으로 돌아가기</span>
      <img src={gobackbutton} alt="Go back icon" />
    </Button>
  );
}
