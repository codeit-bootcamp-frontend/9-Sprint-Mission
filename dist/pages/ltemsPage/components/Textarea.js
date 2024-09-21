import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
function Textarea({ value, onChange, placeholder, height }) {
    return (_jsx(StyledTextarea, { value: value, onChange: onChange, placeholder: placeholder, height: height }));
}
export default Textarea;
const StyledTextarea = styled.textarea `
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
