import { ReactNode } from "react";
import styles from "./FormButton.module.css";

interface FormButtonProps {
  children: ReactNode;
  color: string;
  disabled?: boolean;
  type: "submit" | "button" | "reset";
}

export default function FormButton({children, color, disabled, type = "submit"}: FormButtonProps) {
  
  return (
    <>
    <button type={type} disabled={disabled} className={`${styles["form-btn"]} ${styles[color]}`}>{children}</button>
    </>
  )
}