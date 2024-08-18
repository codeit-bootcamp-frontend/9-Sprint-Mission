import { useState } from "react";
import FileInput from "../components/FileInput";
import styles from "./AddItemPage.module.css";
import remove from "../assets/removeImg.png";

const INTIAL_VALUES = {
  title: "",
  content: "",
  price: "",
  tag: "",
  imgFile: null,
};

function AddItemPage() {
  const [values, setValues] = useState(INTIAL_VALUES);
  const [tags, setTags] = useState([]);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  //가격 입력 처리
  const handlePriceChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, ""); // 숫자 외 문자 제거
    const formattedValue = new Intl.NumberFormat().format(numericValue); // 숫자 3자리마다 콤마 추가
    handleChange("price", formattedValue);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && values.tag.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, values.tag.trim()]);
      handleChange("tag", "");
    }
  };

  const handleDeleteTag = (tagIndex) => {
    const nextTags = tags.filter((tag, index) => index !== tagIndex);
    setTags(nextTags);
  };

  //등록 버튼 활성화
  const isFormValues = values.title && values.content && values.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); // API로 보내기 전 console.log로 대체
  };

  return (
    <form className={styles.addItemForm} onSubmit={handleSubmit}>
      <strong className={styles.formName}>상품 등록하기</strong>
      <label className={styles.inputName} htmlFor="itemImg">
        상품 이미지
      </label>
      <FileInput
        name="imgFile"
        id="itemImg"
        value={values.imgFile}
        onChange={handleChange}
      />
      <label className={styles.inputName} htmlFor="title">
        상품명
      </label>
      <input
        className={styles.inputStyle}
        name="title"
        id="title"
        value={values.title}
        onChange={handleInputChange}
        placeholder="상품명을 입력해주세요"
      />
      <label className={styles.inputName} htmlFor="content">
        상품 소개
      </label>
      <textarea
        className={`${styles.inputStyle} ${styles.textAreaStyle}`}
        name="content"
        id="content"
        value={values.content}
        onChange={handleInputChange}
        placeholder="상품 소개를 입력해주세요"
      />
      <label className={styles.inputName} htmlFor="price">
        상품 가격
      </label>
      <input
        className={styles.inputStyle}
        name="price"
        id="price"
        type="text"
        value={values.price}
        onChange={handlePriceChange}
        placeholder="판매 가격를 입력해주세요"
      />
      <label className={styles.inputName} htmlFor="tag">
        태그
      </label>
      <input
        className={styles.inputStyle}
        name="tag"
        id="tag"
        value={values.tag}
        onChange={handleInputChange}
        onKeyDown={handleAddTag}
        placeholder="태그를 입력해주세요"
      />
      <div className={styles.tagContainer}>
        {tags.map((tag, index) => (
          <span key={index} className={styles.tag}>
            #{tag}
            <button type="button" onClick={() => handleDeleteTag(index)}>
              <img src={remove} alt="삭제" width={20} height={20} />
            </button>
          </span>
        ))}
      </div>

      {/*등록 버튼은 탭 이동시 마지막에 선택되게 배치 */}
      <button
        className={styles.registButton}
        type="submit"
        disabled={!isFormValues}
      >
        등록
      </button>
    </form>
  );
}

export default AddItemPage;
