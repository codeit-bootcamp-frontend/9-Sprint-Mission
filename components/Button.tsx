import { ReactNode } from "react";
import styles from "@/components/Button.module.css";

interface Button {
children: ReactNode;
color: string;
}
export default function Button({children, color} :Button) {

  const classNames = `${styles.button} ${styles[color]}`
  return (
    <button type="button" className={classNames}>{children}</button>
  )
}