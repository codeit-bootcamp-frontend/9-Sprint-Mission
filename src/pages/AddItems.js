import styles from "./AddItems.module.css";
import { FileInput } from "../components/FileInput";
import { useState, useEffect, useRef } from "react";

export default function AddItems() {
  const inputRef = useRef();
  const tagRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [values, setValues] = useState({
    imgFile: null,
    title: "",
    description: "",
    price: null,
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

  const handleTagChange = (e) => {
    const inputNode = tagRef.current;
    if (e.key === "Enter") {
      const nextTag = inputNode.value.trim();
      if (tagList.length < 10 && nextTag) {
        setTagList((prevTag) => [...prevTag, nextTag]);
        inputNode.value = "";
      }
    }
  };

  const handleTagDelete = (currnetTag) => {
    const newTagList = tagList.filter((tag) => tag !== currnetTag);
    setTagList(newTagList);
  };

  useEffect(() => {
    if (
      values.imgFile &&
      values.title &&
      values.description &&
      values.price > 0 &&
      tagList.length > 0
    )
      setIsActive(true);
    else setIsActive(false);
  }, [values, tagList]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.register_wrap}>
        <h2 className={styles.title}>상품 등록하기</h2>
        <button
          type="submit"
          className={styles.register_button}
          disabled={!isActive}
        >
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
          ref={inputRef}
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
          type="text"
          className={styles.input_tag}
          placeholder="태그를 입력해주세요"
          onKeyUp={handleTagChange}
          ref={tagRef}
        ></input>
        <div className={styles.tag_list}></div>
        <div className={styles.tagList_wrap}>
          {tagList.map((tag, index) => (
            <div key={index} className={styles.tagList}>
              <div>{`#${tag}`}</div>
              <button
                div
                className={styles.tagList_close_button}
                onClick={() => handleTagDelete(tag)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
