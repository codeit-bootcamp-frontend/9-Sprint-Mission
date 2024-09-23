import styled from "styled-components";

interface LoginInputProps {
  text: string;
  name: string;
  placeholder: string;
}

const LoginInput = ({ text, name, placeholder }: LoginInputProps) => {
  return (
    <StyledLoginInput>
      <label htmlFor={name}>{text}</label>
      <input id={name} type="text" name={name} placeholder={placeholder} />
    </StyledLoginInput>
  );
};

export default LoginInput;

const StyledLoginInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  input {
    padding: 15px 24px;
    border: none;
    border-radius: 12px;
    background: #f3f4f6;
    outline: none;
  }
`;
