import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/ic_x.svg";
import { FC } from "react";

// Button 스타일 정의
const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[0]};
  }
`;

// DeleteButton 컴포넌트의 props 타입 정의
interface DeleteButtonProps {
  onClick: () => void; // onClick은 함수로 정의
  label: string; // label은 문자열로 정의
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, label }) => {
  return (
    <Button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};

export default DeleteButton;
