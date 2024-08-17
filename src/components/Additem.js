import React, { useState } from "react";
import { Header } from "./Header";
import styles from "./styles/Additem.module.css";

export function Additem() {
  const [formValues, setFormValues] = useState({
    productImg: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productTag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onChangeNum = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setFormValues((prevValues) => ({
      ...prevValues,
      productPrice: str,
    }));
  };

  const addComma = (num) => {
    let returnString = num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const isFilled = Object.values(formValues).every(
    (value) => value.trim() !== ""
  );

  return (
    <>
      <Header />
      <main>
        <form className={styles.addForm} action="#">
          <h1 className={styles.pageName}>상품 등록하기</h1>
          <label className={styles.labelName} id={styles.addImg}>
            상품 이미지
            <input
              onChange={handleChange}
              name="productImg"
              type="file"
            ></input>
          </label>
          <label className={styles.labelName} id={styles.addName}>
            상품명
            <input
              onChange={handleChange}
              name="productName"
              placeholder="상품명을 입력해주세요"
              type="text"
            ></input>
          </label>
          <label className={styles.labelName} id={styles.addDescription}>
            상품 소개
            <textarea
              name="productDescription"
              placeholder="상품 소개를 입력해주세요"
              onChange={handleChange}
            ></textarea>
          </label>
          <label className={styles.labelName} id={styles.addPrice}>
            판매 가격
            <input
              name="productPrice"
              placeholder="판매 가격을 입력해주세요"
              type="text"
              value={addComma(formValues.productPrice) || ""}
              onChange={onChangeNum}
            ></input>
          </label>
          <label className={styles.labelName} id={styles.addTag}>
            태그
            <input
              onChange={handleChange}
              name="productTag"
              placeholder="태그를 입력해주세요"
              type="text"
            ></input>
          </label>
          <button
            type="submit"
            disabled={!isFilled}
            className={`${styles.addBtn} ${!isFilled ? styles.disabled : ""}`}
          >
            등록
          </button>
        </form>
      </main>
    </>
  );
}
