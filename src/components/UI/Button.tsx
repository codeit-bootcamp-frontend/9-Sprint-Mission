import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props {
  children: ReactNode;
}

const Button = ({ children }: Props) => {
  return <button className={styles.buttonStyle}>{children}</button>;
};

export default Button;
