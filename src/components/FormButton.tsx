import { ReactNode } from "react";
import styles from "./FormButton.module.css";

interface FormButtonProps {
  children: ReactNode;
  color: string;
  disabled: boolean;
}

export default function FormButton({children, color, disabled}: FormButtonProps) {
  
  return (
    <>
    <button type="submit" disabled={disabled} className={`${styles["form-btn"]} ${styles[color]}`}>{children}</button>
    </>
  )
}