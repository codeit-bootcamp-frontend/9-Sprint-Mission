import Image from "next/image";
import styles from "./MainCard.module.css";
import classNames from "classnames/bind";

interface Props {
  subtitle: string;
  headline: string;
  secondHeadline: string;
  description: string;
  imgSrc: string;
  reverse?: string;
}
export function MainCard({
  subtitle,
  headline,
  secondHeadline,
  description,
  imgSrc,
  reverse,
}: Props) {
  const cx = classNames.bind(styles);

  return (
    <div className={styles["card-wrap"]}>
      <div className={cx("card", reverse ? "reverse-card" : "")}>
        <Image
          className={styles.img}
          src={imgSrc}
          width={579}
          height={444}
          alt=""
        />
        <div className={styles["card-description"]}>
          <div className={cx("subtitle", reverse ? "reverse-subtitle" : "")}>
            {subtitle}
          </div>
          <div className={styles["headline-descrpt"]}>
            <div className={cx("headline", reverse ? "reverse-headline" : "")}>
              {headline}
              <br className={styles.br} />
              {secondHeadline}
            </div>
            <div
              className={cx("description", reverse ? "reverse-descrpt" : "")}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
