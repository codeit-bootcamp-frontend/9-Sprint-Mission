// Label.tsx
import styled from "styled-components";

interface LabelProps {
  htmlFor: string;
  text: string;
}

const StyledLabel = styled.label`
  margin-bottom: 10px;
  color: var(--gray-800);
  font-weight: 700;
`;

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>;
};

export default Label;
