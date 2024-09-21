import S from "./CommentsNoExist.styels";
import emptyComments from "../../../../assets/images/emptyComments.png";

export function CommentsNoExist() {
  return (
    <S.Container>
      <img src={emptyComments} alt="/" width="196px" height="196px" />
      <span>아직 문의가 없어요.</span>
    </S.Container>
  );
}
