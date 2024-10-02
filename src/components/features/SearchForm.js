import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./SearchForm.module.scss";
import Image from "next/image";
import SearchIcon from "@/public/assets/icon/ic_search.png";

export default function SearchForm({ initialValue = "" }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) {
      router.push(`/boards`);
      return;
    }
    router.push(`/search?q=${value}`);
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
