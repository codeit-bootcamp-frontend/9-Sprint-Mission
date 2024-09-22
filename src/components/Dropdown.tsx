import styles from "../components/styles/Dropdown.module.css";

export function Dropdown({ isOpen }:{isOpen : boolean} ) {
  return (
    <div className={`${styles.dropdown} ${isOpen ? "" : styles.hidden}`}>
      <button type="button">수정하기</button>
      <button type="button">삭제하기</button>
    </div>
  );
}
