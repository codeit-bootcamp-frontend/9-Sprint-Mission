import { ReactNode } from "react";
import styles from "./DropdownMenu.module.scss";
import { useDropdown } from "./DropdownMenu";

interface DropdownItemProps {
  children?: ReactNode;
  onClick: () => void;
}

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  const { setIsOpen } = useDropdown();
  const handleClick = () => {
    onClick();
    setIsOpen((prev) => !prev);
  };

  return (
    <div onClick={handleClick} className={styles.dropdownItem}>
      {children}
    </div>
  );
};

export default DropdownItem;
