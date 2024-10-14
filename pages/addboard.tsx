import { TextInput } from "@/components/TextInput";
import styles from "./addboard.module.css";
import FileInput from "@/components/FileInput";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import SubmitBtn from "@/components/SubmitBtn";

export default function AddBoard() {
  const handleSubmitArticle = () => {
    //게시글에 댓글 등록 api
  };
  const [fill, setFill] = useState({
    title: "",
    content: "",
  });

  const active = fill.title && fill.content;

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFill((prev) => ({ ...prev, title: newTitle }));
  };

  const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    setFill((prev) => ({ ...prev, content: newContent }));
  };
  return (
    <div className={`container ${styles.addform}`}>
      <h1 className={styles.title}>게시글 쓰기</h1>
      <form onSubmit={handleSubmitArticle} className={styles.form}>
        <TextInput
          type="text"
          value={fill.title}
          label="title"
          placeholder="제목을 입력해주세요"
          required
          onChange={handleChangeTitle}
        >
          *제목
        </TextInput>

        <TextInput
          type="text"
          value={fill.content}
          label="content"
          placeholder="내용을 입력해주세요"
          required
          onChange={handleChangeContent}
        >
          *내용
        </TextInput>

        <FileInput />
        {/* 조건부 disable, 스타일 */}
        <Link href="/boards">
          <SubmitBtn disabled={!active}>등록</SubmitBtn>
        </Link>
      </form>
    </div>
  );
}
