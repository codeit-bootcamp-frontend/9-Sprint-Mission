import styles from "@/components/SearchForm.module.css";
import { Articles } from "@/types/types";
import { use, useEffect, useState } from "react";
import axios from "@/lib/axios";
import useDebouncedEffect from "@/utils/useDebounce";
import useDebounce from "@/utils/useDebounce";

interface Props {
  className: string; // className은 문자열이고 선택적인 값
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm = ({ className, keyword, setKeyword }: Props) => {
  const [inputValue, setInputValue] = useState(keyword); // 실시간으로 변경되는 input value값 저장

  const debouncedKeyword = useDebounce(inputValue, 500); // input에 change event가 일어날 때 마다 지연

  useEffect(() => {
    setKeyword(debouncedKeyword);
  }, [debouncedKeyword, setKeyword]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setInputValue(e.target.value);
  };

  return (
    <div className={className}>
      <form>
        <label htmlFor="search"></label>
        <input
          className={styles["search-input"]}
          id="search"
          placeholder="검색할 상품을 입력해주세요"
          value={inputValue}
          name="title"
          onChange={handleChangeKeyword}
        ></input>
      </form>
    </div>
  );
};

export default SearchForm;
