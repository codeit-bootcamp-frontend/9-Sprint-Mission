import styles from "../components/styles/kebab.module.css";

export function Kebab({ onClick }) {
  return (
    <button
      type="button"
      className={styles.kebabIcon}
      onClick={onClick}
    ></button>
  );
}
