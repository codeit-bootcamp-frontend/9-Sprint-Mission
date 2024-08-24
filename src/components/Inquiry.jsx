import { useState } from "react";
import styles from "./Inquiry.module.css";

function Inquiry() {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleInquirySubmit = () => {
    //데이터 post 요청 필요
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    handleInquirySubmit();
  };

  return (
    <form onSubmit={handleInquirySubmit}>
      <div className={styles["inquiry-container"]}>
        <label className={styles["inquiry-label"]} htmlFor="inquiry">
          문의하기
        </label>
        <textarea
          className={styles["inquiry-input"]}
          id="inquiry"
          value={value}
          type="text"
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
      </div>
      <div className={styles["inquiry-wrap-button"]}>
        <button
          className={`${styles["inquiry-button"]} ${
            value ? styles["active"] : ""
          }`}
          type="submit"
          onClick={handleSubmitButton}
          disabled={!value}
        >
          등록
        </button>
      </div>
    </form>
  );
}

export default Inquiry;
