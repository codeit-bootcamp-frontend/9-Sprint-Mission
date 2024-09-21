import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const LoginInput = ({ text, name, placeholder }) => {
    return (_jsxs(StyledLoginInput, { children: [_jsx("label", { htmlFor: name, children: text }), _jsx("input", { id: name, type: "text", name: name, placeholder: placeholder })] }));
};
export default LoginInput;
const StyledLoginInput = styled.div `
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
