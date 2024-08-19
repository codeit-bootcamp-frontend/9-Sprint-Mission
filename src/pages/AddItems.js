import styles from "./AddItems.module.css";
import { FileInput } from "../components/FileInput";
import { useState } from "react";

export default function AddItems() {
  const [values, setValues] = useState({
    imgFile: null,
    title: "",
    description: "",
    price: 0,
    tag: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  useEffect(() => {}, [values]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.register_wrap}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button type="submit" className={styles.register_button}>
          등록
        </button>
      </div>
      <div className={styles.wrap}>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        ></FileInput>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>상품명</h2>
        <input
          type="text"
          name="title"
          value={values.title}
          className={styles.input_name}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>상품 소개</h2>
        <textarea
          name="description"
          value={values.description}
          type="text"
          className={styles.input_description}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>판매가격</h2>
        <input
          name="price"
          value={values.price}
          type="number"
          className={styles.input_price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
        ></input>
      </div>
      <div className={styles.wrap}>
        <h2 className={styles.title}>태그</h2>
        <input
          name="tag"
          value={values.tag}
          type="text"
          className={styles.input_tag}
          placeholder="태그를 입력해주세요"
          onChange={handleInputChange}
        ></input>
        <div className={styles.tag_list}></div>
      </div>
    </form>
  );
}
