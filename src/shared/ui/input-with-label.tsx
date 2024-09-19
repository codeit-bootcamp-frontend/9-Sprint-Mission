import Label from "./label";
import Input from "./input";
import styled from "styled-components";
import { InputWithLabelProps } from "../types/input-with-label";

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

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Container>
      <Label htmlFor={id} text={label} />
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default InputWithLabel;
