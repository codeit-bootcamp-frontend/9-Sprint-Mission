import Button from "@/components/Button";
import FileInput from "./FileInput";
import styles from "./MainInput.module.css";
import { useState } from "react";

const INITIAL_VALUES = {
  title: "",
  content: "",
  imgFile: null,
};

function MainInput() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    console.log(formData);
    setValues(INITIAL_VALUES);
  };

  const isSubmitDisabled = !values.title || !values.content;

  return (
    <form className={styles.mainInput} onSubmit={handleSubmit}>
      <div className={styles.addBoardHeader}>
        <h2>게시글 쓰기</h2>
        <Button
          width="74px"
          type="submit"
          disabled={isSubmitDisabled}
          background={isSubmitDisabled ? "#9CA3AF" : "#3692FF"}
        >
          등록
        </Button>
      </div>
      <label className={styles.inputTitle} htmlFor="title">
        *제목
      </label>
      <input
        name="title"
        value={values.title}
        className={styles.inputText}
        type="text"
        placeholder="제목을 입력해주세요"
        onChange={handleInputChange}
      />

      <label className={styles.inputTitle} htmlFor="content">
        *내용
      </label>
      <textarea
        name="content"
        value={values.content}
        className={styles.inputTextArea}
        placeholder="내용을 입력해주세요"
        onChange={handleInputChange}
      />

      <label className={styles.inputTitle} htmlFor="imgFile">
        이미지
      </label>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
    </form>
  );
}

export default MainInput;
