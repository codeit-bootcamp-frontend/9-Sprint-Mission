import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  width?: string;
  height?: string;
  border?: string;
  radius?: string;
  background?: string;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
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
