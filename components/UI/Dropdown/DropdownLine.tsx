import { ReactNode } from "react";
import styles from "./DropdownMenu.module.scss";

interface DropdownLineProps {
  children?: ReactNode;
}

const DropdownLine = ({ children }: DropdownLineProps) => {
  return <span className={styles.dropdownLine}>{children}</span>;
};

export default DropdownLine;
