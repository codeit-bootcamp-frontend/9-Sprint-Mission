import styles from "./Kebab.module.css";
import kebabButton from "@/src/assets/ic_kebab.png";
import Image from "next/image";

export default function Kebab() {
  return (
    <Image
      className={styles.kebabButton}
      src={kebabButton}
      alt="케밥"
      width={24}
      height={24}
    />
  );
}
