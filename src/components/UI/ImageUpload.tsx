import styles from "@/src/components/UI/ImageUpload.module.css";
import Image from "next/image";
import addImage from "@/src/assets/ic_plus.png";
import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.value[0];
    setImage(file);
  };

  return (
    <div className={styles.imageForm}>
      <label className={styles.label}>이미지</label>
      <label className={styles.addFile} htmlFor="image">
        <Image src={addImage} alt="이미지 추가" width={48} height={48} />
        이미지 등록
      </label>
      <input
        className={styles.fileInput}
        id="image"
        type="file"
        value={image}
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
}

/*
1. 이미지 추가했을 때 프리뷰 구현 (프리뷰, 삭제)
2. 반응형 크기 구현 (태블릿, 모바일)
3.
*/
