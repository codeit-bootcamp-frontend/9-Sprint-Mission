import { ReactNode } from "react";
import styles from "./DropdownMenu.module.scss";

interface DropdownItemProps {
  children?: ReactNode;
}

const DropdownItem = ({ children }: DropdownItemProps) => {
  return <div className={styles.dropdownItem}>{children}</div>;
};

export default DropdownItem;
