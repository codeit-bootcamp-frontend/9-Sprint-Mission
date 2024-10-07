import styles from "./Profile.module.scss";
import Image from "next/image";
import DefaultProfileImage from "@/assets/images/icons/ic_profile.svg";
import { ReactNode } from "react";

interface Props {
  nickname: string;
  ProfileImage?: string;
  size: number;
  children?: ReactNode;
}

const Profile = ({ nickname, ProfileImage, size, children }: Props) => {
  return (
    <div className={styles.profile}>
      <Image
        className={styles.profileImage}
        src={ProfileImage ? ProfileImage : DefaultProfileImage}
        width={size}
        height={size}
        alt={`${nickname}님의 프로필 사진`}
      />
      <p className={styles.nickname}>{nickname}</p>
      {children}
    </div>
  );
};

export default Profile;
