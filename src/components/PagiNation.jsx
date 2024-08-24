import styles from "./PagiNation.module.css";

const lt = "<";
const gt = ">";
const BUTTON_NUMBERS = [1, 2, 3, 4, 5];

function PagiNation({ onPageChange }) {
  return (
    <>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange()}
      >
        {lt}
      </button>

      {BUTTON_NUMBERS.map((button_number) => {
        return (
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(button_number)}
          >
            {button_number}
          </button>
        );
      })}

      <button
        className={styles.paginationButton}
        onClick={() => onPageChange()}
      >
        {gt}
      </button>
    </>
  );
}

export default PagiNation;
