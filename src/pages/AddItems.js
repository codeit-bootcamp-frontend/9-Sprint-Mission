import styles from "./AddItems.module.css";

export default function AddItems() {
  return (
    <form className={styles.container}>
      <div className={styles.register_wrap}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button type="submit" className={styles.register_button}>
          등록
        </button>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>상품 이미지</h2>
        <div className={styles.input_img_wrap}>
          <label htmlFor="file">
            <div className={styles.input_img_label}>이미지를 넣어주세요.</div>
          </label>
          <input type="file" id="file" className={styles.input_file}></input>
        </div>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>상품명</h2>
        <input
          type="text"
          className={styles.input_name}
          placeholder="상품명을 입력해주세요"
        ></input>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>상품 소개</h2>
        <textarea
          type="text"
          className={styles.input_description}
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>판매가격</h2>
        <input
          type="number"
          className={styles.input_price}
          placeholder="판매 가격을 입력해주세요"
        ></input>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>태그</h2>
        <input
          type="text"
          className={styles.input_tag}
          placeholder="태그를 입력해주세요"
        ></input>
        <div className={styles.tag_list}></div>
      </div>
    </form>
  );
}
