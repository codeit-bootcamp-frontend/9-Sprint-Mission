import { ChangeEventHandler, FormEventHandler } from "react";
import Image from "next/image";
import styles from "./Search.module.scss";
import SearchIcon from "@/assets/images/icons/ic_search.svg";

interface Props {
  handleSearchChange: ChangeEventHandler;
  handleSearchSubmit: FormEventHandler;
  search: string | null;
}

const Search = ({ handleSearchChange, handleSearchSubmit, search }: Props) => {
  return (
    <>
      <form onSubmit={handleSearchSubmit} className={styles.searchBarWrapper}>
        <button>
          <Image src={SearchIcon} width={24} height={24} alt="검색" />
        </button>
        <input
          name="keyword"
          value={search || ""}
          className={styles.searchBarInput}
          placeholder="검색할 상품을 입력해 주세요"
          onChange={handleSearchChange}
        />
      </form>
    </>
  );
};

export default Search;
