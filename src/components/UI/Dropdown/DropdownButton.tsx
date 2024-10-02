import { useDropdown } from "./DropdownMenu";
import Image from "next/image";
import styles from "./DropdownMenu.module.scss";
import SortIcon from "@/assets/images/icons/ic_sort.svg";

const DropdownButton = () => {
  const { toggleDropdown } = useDropdown();

  return (
    <>
      <button
        className={styles.sortDropdownTriggerButton}
        onClick={toggleDropdown}
      >
        <Image src={SortIcon} width={30} height={30} alt="sort" />
      </button>
    </>
  );
};

export default DropdownButton;
