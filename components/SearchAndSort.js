import SearchForm from "./features/SearchForm";
import DropdownMenu from "./features/DropdownMenu";
import styles from "./SearchAndSort.module.scss";

export default function SearchAndSort({ setSortOrder }) {
  return (
    <>
      <div className={styles["filter-section"]}>
        <SearchForm />
        <DropdownMenu setSortOrder={setSortOrder} />
      </div>
    </>
  );
}
