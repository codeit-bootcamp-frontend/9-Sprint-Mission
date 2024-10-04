import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./SearchForm.module.scss";
import Image from "next/image";
import SearchIcon from "@/public/assets/icon/ic_search.png";

interface SearchFormProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

export default function SearchForm({
  initialValue = "",
  onSearch,
}: SearchFormProps) {
  const [value, setValue] = useState<string>(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <>
      <form className={styles["search-box"]} onSubmit={handleSubmit}>
        <button type="submit">
          <Image src={SearchIcon} width={24} height={24} alt="검색" />
        </button>
        <input
          className="form-input"
          name="q"
          value={value}
          onChange={handleChange}
          placeholder="검색할 상품을 입력해주세요"
        />
      </form>
    </>
  );
}
