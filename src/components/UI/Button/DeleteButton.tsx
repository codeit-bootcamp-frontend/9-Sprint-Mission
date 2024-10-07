import Image from "next/image";
import styles from "./DeleteButton.module.scss";
import CloseIcon from "@/assets/images/icons/ic_x.svg";
import { MouseEventHandler } from "react";

interface DeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const DeleteButton = ({ onClick, label }: DeleteButtonProps) => {
  return (
    <button
      className={styles.deleteButton}
      aria-label={`${label} 삭제`}
      onClick={onClick}
    >
      <Image src={CloseIcon} width={10} height={10} alt={`${label} 삭제`} />
    </button>
  );
};

export default DeleteButton;
