import { ChangeEvent } from "react";
import styled from "styled-components";

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  height?: string;
}

function Textarea({ value, onChange, placeholder, height }: TextareaProps) {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      height={height}
    />
  );
}

export default Textarea;

const StyledTextarea = styled.textarea<{ height?: string }>`
  width: 100%;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  outline: none;
  padding: 16px;
  margin-bottom: 16px;
  resize: none;
  box-sizing: border-box;
  line-height: 1.2;
  height: ${(props) => props.height || "104px"};

  ::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    height: ${(props) => props.height || "129px"};
    padding: 16px 24px;
    ::placeholder {
      font-size: 14px;
    }
  }
`;
