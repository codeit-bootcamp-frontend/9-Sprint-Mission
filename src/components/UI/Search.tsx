import { ChangeEventHandler, FormEventHandler } from "react";
import Image from "next/image";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/images/icons/ic_search.svg";

interface Props {
  handleChange: ChangeEventHandler;
  handleSubmit: FormEventHandler;
  keyword: string;
}

const Search = ({ handleSubmit, handleChange, keyword }: Props) => {
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchBarWrapper}>
        <button>
          <Image src={SearchIcon} width={24} height={24} alt="검색" />
        </button>
        <input
          name="keyword"
          value={keyword}
          className={styles.searchBarInput}
          placeholder="검색할 상품을 입력해 주세요"
          onChange={handleChange}
        />
      </form>
    </>
  );
};

export default Search;
