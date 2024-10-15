import Image from "next/image";
import styled from "styled-components";
import visibleIcon from "@/assets/images/icons/eye-visible.svg";
import invisibleIcon from "@/assets/images/icons/eye-invisible.svg";
import { ChangeEvent, FocusEvent } from "react";

interface CustomInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  isTouched: boolean;
  errorMessage: string | boolean;
  isVisible?: boolean;
  toggleVisibility?: () => void;
}

const CustomInput = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  isTouched = false,
  errorMessage = "",
  isVisible = false,
  toggleVisibility,
}: CustomInputProps) => {
  return (
    <InputWrap>
      <label htmlFor={name}>{label}</label>
      <Input
        type={isVisible ? "text" : type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {toggleVisibility && (
        <VisibleButton type="button" onClick={toggleVisibility}>
          <Image
            src={isVisible ? visibleIcon : invisibleIcon}
            width={24}
            height={24}
            alt="password visibility toggle"
          />
        </VisibleButton>
      )}
      {isTouched && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputWrap>
  );
};

export default CustomInput;

// 스타일 컴포넌트
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 640px;
  margin-top: 24px;

  &:nth-of-type(n + 3) {
    position: relative;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  border: transparent;
  border-radius: 12px;
  background-color: var(--gray-100);
  color: var(--gray-400);
`;

const VisibleButton = styled.button`
  position: absolute;
  top: 53px;
  right: 20px;
  z-index: 1;
  width: 24px;
  height: 24px;
`;

const ErrorMessage = styled.span`
  padding-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #f74747;
`;
