import styles from "@/src/styles/AddBoard.module.css";
import ImageUpload from "@/src/components/UI/ImageUpload";
import { useState } from "react";
import { useRouter } from "next/router";
import Contanier from "../components/Layout/Container";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      // 제출 로직 추가
      console.log("Form submitted");
      router.push(`/board/${id}`);
    }
  };

  const isButtonDisabled = !(title && content);

  return (
    <Contanier>
      <div className={styles.main}>
        <div className={styles.mainHeader}>
          <h2 className={styles.mainTitle}>게시글 작성</h2>
        </div>
        <form className={styles.boardForm} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="title">
            *제목
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력해주세요"
          />

          <label className={styles.label} htmlFor="content">
            *내용
          </label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          />

          <ImageUpload />

          <button
            className={styles.addButton}
            type="submit"
            disabled={isButtonDisabled}
          >
            등록
          </button>
        </form>
      </div>
    </Contanier>
  );
}

/*
1. 등록 버튼 활성화 시 구분 필요 (호버, 커서)
2. post 요청 필요
*/
