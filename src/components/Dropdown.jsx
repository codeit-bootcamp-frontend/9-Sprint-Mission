import styles from "../assets/styles/Dropdown.module.css";

function Dropdown({ onSelect }) {
  return (
    <div className={styles.dropdown}>
      <button value="recent" onClick={onSelect} className={styles.element}>
        최신순
      </button>
      <button value="favorite" onClick={onSelect} className={styles.element}>
        좋아요순
      </button>
    </div>
  );
}

export default Dropdown;
