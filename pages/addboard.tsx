import { TextInput } from "@/components/TextInput";
import styles from "./addboard.module.css";

export default function AddBoard() {
  return (
    <div className={`container ${styles.addform}`}>
      <h1 className={styles.title}>게시글 쓰기</h1>
      <form className={styles.form}>
        <TextInput label="title" placeholder="제목을 입력해주세요" required>
          *제목
        </TextInput>

        <TextInput label="content" placeholder="내용을 입력해주세요" required>
          *내용
        </TextInput>

        {/* 가짜 라벨 */}
        <div className={styles["image-label"]}>이미지</div>

        <label className={styles["image-input"]} htmlFor="imageInput">
          <div className={styles["image-icon-text"]}></div>
          <div className={styles["bg-icon"]}></div>
          <div className={styles["input-text"]}>이미지 등록</div>
        </label>
        <input id="imageInput" type="file" hidden />
        {/* 조건부 disable, 스타일 */}
        <button className={styles.button} type="submit">
          등록
        </button>
      </form>
    </div>
  );
}
