import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
const Button = ({ children, ...props }) => {
    return _jsx(StyledButton, { ...props, children: children });
};
export default Button;
const StyledButton = styled.button `
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: ${({ color }) => color || "#fff"};
  width: ${({ width }) => width || 106}px;
  height: ${({ height }) => height || 42}px;
  border: 1px solid ${({ border }) => border || "none"};
  border-radius: ${({ radius }) => radius || 8}px;
  background: ${({ background }) => background || "#3692FF"};
`;
