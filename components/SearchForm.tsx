import styles from "@/components/SearchForm.module.css";
import Image from "next/image";

interface Props {
  className: string; // className은 문자열이고 선택적인 값
}

const SearchForm = ({ className } : Props) => {
  return (
    <div className={className}>
      <form>
        <label htmlFor="search"></label>
        <input
          className={styles["search-input"]}
          id="search"
          placeholder="검색할 상품을 입력해주세요"
        >
        </input>
      </form>
    </div>
  );
};

export default SearchForm;
