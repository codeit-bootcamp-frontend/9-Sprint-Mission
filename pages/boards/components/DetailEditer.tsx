import Button from "@/components/Button";
import styles from "./DetailEditer.module.css";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

function DetailEditer() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    console.log(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.detailEditer}>
      <h3>댓글달기</h3>
      <textarea
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder="댓글을 입력해주세요."
      />
      <div className={styles.editerButton}>
        <Button
          type="submit"
          width="74px"
          background={value ? "#3692FF" : "#9CA3AF"}
          disabled={!value}
        >
          등록
        </Button>
      </div>
    </form>
  );
}

export default DetailEditer;
