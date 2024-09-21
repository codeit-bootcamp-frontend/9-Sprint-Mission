import S from "./BackToProductListButton.styles";
import gobackbutton from "../../../../assets/images/icons/goback.png";
import { useNavigate } from "react-router-dom";

export function BackToProductListButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/items");
  };

  return (
    <S.Button onClick={handleClick}>
      <span>목록으로 돌아가기</span>
      <img src={gobackbutton} alt="Go back icon" />
    </S.Button>
  );
}
