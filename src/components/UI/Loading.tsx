import Image from "next/image";
import spinnerImg from "@/assets/images/ui/img_loading.svg";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Image
        className={styles.loading}
        src={spinnerImg}
        width={100}
        height={100}
        alt="로딩 중...."
      />
    </div>
  );
};

export default Loading;
