import useScreenSize from "@/hooks/useScreenSize";
import Button from "../Button";
import styles from "./HomeBanner.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface HomeBannerProps {
  content: string;
  image: string;
  position?: string;
}

function HomeBanner({ content, image, position = "top" }: HomeBannerProps) {
  const router = useRouter();
  const { isMobile } = useScreenSize();

  return (
    <div className={styles.homeBanner}>
      <div className={styles.homeBannerMain}>
        <div
          className={`${styles.homeBannerLeft} ${
            position === "bottom" ? styles.bottom : ""
          }`}
        >
          <h2 className={styles.homeBannerLeftTitle}>{content}</h2>
          <Button
            onClick={() => router.push("/items")}
            width={!isMobile ? "357px" : "240px"}
            radius="40px"
          >
            구경하러 가기
          </Button>
        </div>
        <Image src={image} alt="배너사진" width={746} height={340} />
      </div>
    </div>
  );
}

export default HomeBanner;
