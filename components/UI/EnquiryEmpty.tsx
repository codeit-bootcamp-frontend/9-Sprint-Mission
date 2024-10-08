import Image from "next/image";
import styles from "./EnquiryEmpty.module.scss";
import InquiryEmpty from "@/assets/images/ui/empty-comments.svg";

const EnquiryEmpty = () => {
  return (
    <section className={styles.EnquiryEmpty}>
      <Image
        src={InquiryEmpty}
        width={200}
        height={161}
        alt="아직 문의가 없어요"
      />
      <p className={styles.title}>아직 문의가 없어요</p>
    </section>
  );
};

export default EnquiryEmpty;
