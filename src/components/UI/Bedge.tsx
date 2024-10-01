import badge from "@/src/assets/ic_medal.png";
import Image from "next/image";
import styles from "./Bedge.module.css";

export default function Bedge() {
  return (
    <div className={styles.bedgeContainer}>
      <Image src={badge} alt="뱃지" width={16} height={16} />
      <em className={styles.bedgeTitle}>Best</em>
    </div>
  );
}
