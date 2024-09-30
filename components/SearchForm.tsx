import styles from "@/components/SearchForm.module.css";
import { Articles } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface Props {
  className: string; // className은 문자열이고 선택적인 값
  // articles: Articles[];
  // setArticles: React.Dispatch<React.SetStateAction<Articles[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm = ({ className, title, setTitle } : Props) => {

const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
 setTitle(e.target.value);
}

  return (
    <div className={className}>
      <form>
        <label htmlFor="search"></label>
        <input
          className={styles["search-input"]}
          id="search"
          placeholder="검색할 상품을 입력해주세요"
          value={title}
          name="title"
          onChange={handleChangeTitle}
        >
        </input>
      </form>
    </div>
  );
};

export default SearchForm;
