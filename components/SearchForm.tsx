import { ChangeEvent } from "react";
import styles from "./ArticleList.module.css";

export const SearchForm = ({
  search,
  handleChangeValue,
}: {
  search: string;
  handleChangeValue: (value: string) => void;
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeValue(e.target.value);
  };
  return (
    <>
      <form className={styles["search-form"]}>
        <input
          className={styles["search-input"]}
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={onChange}
        ></input>
      </form>
    </>
  );
};
