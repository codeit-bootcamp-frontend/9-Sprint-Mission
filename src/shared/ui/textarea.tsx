// Textarea.tsx
import styled from "styled-components";

interface TextareaProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const StyledTextarea = styled.textarea`
  width: 346px;
  height: 282px;
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

const Textarea: React.FC<TextareaProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <StyledTextarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Textarea;
