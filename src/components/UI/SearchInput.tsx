import { useRouter } from "next/router";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./SearchInput.module.css";

interface Query {
  q: string | string[] | null;
}

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      router.push("/boards");
      return;
    }
    router.push(`/boards?q=${value}`);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        name="q"
        value={value}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
      />
    </form>
  );
}
