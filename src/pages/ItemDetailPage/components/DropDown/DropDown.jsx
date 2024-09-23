import S from "./DropDown.styles";

export function DropDown({ onClick, onSubmit, id }) {
  return (
    <S.Container>
      <div onClick={() => onClick(id)}>수정하기</div>
      <div onClick={onSubmit}>삭제하기</div>
    </S.Container>
  );
}
