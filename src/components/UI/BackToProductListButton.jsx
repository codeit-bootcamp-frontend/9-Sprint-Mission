import styled from "styled-components";
import gobackbutton from "../../assets/images/icons/goback.png";

const Button = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: white;
  width: 240px;
  height: 48px;
  background-color: #3692ff;
  border-radius: 40px;
  padding: 12px 64px;
  white-space: nowrap;

  img {
    margin-left: 8px; /* 아이콘과 텍스트 사이에 간격 추가 */
  }
`;

export function BackToProductListButton() {
  return (
    <Button>
      <span>목록으로 돌아가기</span>
      <img src={gobackbutton} alt="Go back icon" />
    </Button>
  );
}
