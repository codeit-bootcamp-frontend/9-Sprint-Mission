import { ReactNode } from "react";
import styles from "./DropdownMenu.module.scss";
import { useDropdown } from "./DropdownMenu";

interface DropdownContainerProps {
  children?: ReactNode;
}

const DropdownContainer = ({ children }: DropdownContainerProps) => {
  const { isOpen } = useDropdown();
  return (
    isOpen && <div className={styles.dropdownMenuContainer}>{children}</div>
  );
};

export default DropdownContainer;
