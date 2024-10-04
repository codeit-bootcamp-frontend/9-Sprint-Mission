import Image from "next/image";
import styles from "./LikeButton.module.scss";
import LikeCountImg from "@/assets/images/icons/ic_heart.svg";
import LikeCountFillImg from "@/assets/images/icons/ic_heart_fill.svg";

interface Props {
  likeCount?: number;
  isLiked?: boolean;
  size: number;
  borderRadius?: boolean;
  fontSize?: string;
}

const LikeButton = ({
  likeCount,
  isLiked,
  size,
  borderRadius,
  fontSize,
}: Props) => {
  return (
    <div
      className={`${styles.LikeButtonWrpper} ${
        borderRadius ? styles.borderRadius : styles.LikeButtonWrpper
      }`}
    >
      <Image
        src={isLiked ? LikeCountFillImg : LikeCountImg}
        width={size}
        height={size}
        alt="like"
      />
      <span
        className={`${styles.likeCount} ${
          fontSize === "large" ? styles.large : styles.likeCount
        }`}
      >
        {likeCount}
      </span>
    </div>
  );
};

export default LikeButton;
