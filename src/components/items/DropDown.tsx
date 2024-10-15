import styled from "styled-components";

export default function DropDown({ onClick, onSubmit, id }) {
  return (
    <Container>
      <div onClick={() => onClick(id)}>수정하기</div>
      <div onClick={onSubmit}>삭제하기</div>
    </Container>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 34px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 132px;
  height: 92px;
  text-align: center;
  border: 1px solid var(--gray-100);
  border-radius: 8px 8px 8px 8px;
  background-color: white;
  color: var(--gray-300);

  div:nth-child(1) {
    width: 100%;
    border-radius: 8px 8px 0 0;
    padding: 16px 0 12px 0;
  }

  div:nth-child(2) {
    width: 100%;
    border-radius: 0 0 8px 8px;
    padding: 12px 17px 16px 17px;
  }

  div:hover {
    background-color: var(--gray-200);
    color: white;
    cursor: pointer;
  }
`;
