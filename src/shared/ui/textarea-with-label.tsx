import Label from "./label";
import Textarea from "./textarea";
import styled from "styled-components";
import { TextareaWithLabelProps } from "../types/textarea-with-label";

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  @media (min-width: 1200px) {
    margin-bottom: 15px;
    flex-direction: row;
  }
`;

const TextareaWithLabel: React.FC<TextareaWithLabelProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Container>
      <Label htmlFor={id} text={label} />
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default TextareaWithLabel;
