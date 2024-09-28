import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chidren?: ReactNode;
  color?: string;
  width?: string;
  height?: string;
  border?: string;
  radius?: string;
  background?: string;
}

const Button = ({
  children,
  color,
  width,
  height,
  border,
  radius,
  background,
  ...props
}: ButtonProps) => {
  const buttonStyle = {
    color,
    width,
    height,
    border,
    borderRadius: radius,
    background,
  };

  return (
    <button
      className={`${styles.button} ${
        color || border || background ? styles.buttonCustom : ""
      }`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
