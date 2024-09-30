import { useState } from "react";
import styles from "./SearchForm.module.css";
import searchIcon from "@/public/assets/ic-search.svg";
import Image from "next/image";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={styles.inputWrap} onSubmit={handleSubmit}>
      <div className={styles.searchIcon}>
        <Image fill src={searchIcon} alt="검색" />
      </div>
      <input
        className={styles.searchInput}
        name="q"
        value={value}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
      />
    </form>
  );
}
