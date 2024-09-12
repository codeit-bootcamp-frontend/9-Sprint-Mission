// Input.tsx
import styled from "styled-components";

interface InputProps {
  id: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const StyledInput = styled.input`
  width: 346px;
  padding: 10px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: var(--gray-100);

  ::placeholder {
    color: var(--gray-400);
  }

  @media (min-width: 768px) {
    width: 768px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <StyledInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
