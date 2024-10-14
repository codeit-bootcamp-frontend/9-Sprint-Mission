import { ReactNode } from "react"
import styles from "./LoginButton.module.css";


interface LoginButtonProps {
  children: ReactNode;
}

export default function LoginButton({children}:LoginButtonProps) {
  return (
    <button className={styles["btn"]}>{children}</button>
  )
}