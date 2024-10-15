import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

const Button = ({ children, type, disabled }: Props) => {
  return (
    <button className={styles.buttonStyle} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
