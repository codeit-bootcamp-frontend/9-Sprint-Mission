import styles from "../components/styles/Dropdown.module.css";
export function Dropdown() {
  return (
    <div className={styles.dropdown}>
      <button>수정하기</button>
      <button>삭제하기</button>
    </div>
  );
}
