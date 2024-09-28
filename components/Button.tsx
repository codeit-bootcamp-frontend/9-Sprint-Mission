import { ReactNode } from "react";
import styles from "@/components/Button.module.css";


export default function Button({children} :{children : ReactNode}) {
  return (
    <button type="button" className={styles.button}>{children}</button>
  )
}