import Button from "@/components/Button";
import styles from "@/styles/addboard.module.css";
import { useState } from "react";

export default function AddBoard() {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, settextAreaValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === "title") setInputValue(e.target.value);
    else settextAreaValue(e.target.value);
  };

  return (
    <>
      <div className={styles["add-container"]}>
        <h2>게시글 쓰기</h2>
        <Button color={inputValue && textAreaValue ? "blue" : "gray"}>
          등록
        </Button>
        
      </div>
      <section className={styles["upload-container"]}>
        <div className={styles["add-title"]}>
          <label htmlFor="title">*제목</label>
          <input
            onChange={handleChange}
            value={inputValue}
            type="text"
            id="title"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className={styles["add-description"]}>
          <label htmlFor="description">*내용</label>
          <textarea
            onChange={handleChange}
            value={textAreaValue}
            id="description"
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <div className={styles["add-img"]}>
          <span>이미지</span>
          <label htmlFor="img" className={styles["add-img-btn"]}>
            <span className={styles["register-img"]}>이미지 등록</span>
          </label>
          <input id="img" type="file"></input>
        </div>
      </section>
    </>
  );
}
