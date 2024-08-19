import React, { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import styles from "./styles/Additem.module.css";
import { Tag } from "./Tag";
import throttle from "../throttle";

export function Additem() {
  const [preview, setPreview] = useState();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);

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

  const isFilled = Object.entries(formValues)
    .filter(([key]) => key !== "productTag")
    .every(([_, value]) => value.trim() !== "");

  //file 인풋 관련
  //1. file 이미지 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFormValues((prevValues) => ({
        ...prevValues,
        productImg: "yes",
      }));
    }
  };
  // 2. 파일 개수 제한
  const handleFileClick = (e) => {
    if (file) {
      setError("*이미지 등록은 최대 1개까지 가능합니다.");
      e.preventDefault();
    }
  };
  // 3. 파일 삭제버튼
  const handleDeleteBtn = (e) => {
    e.preventDefault();
    setFile(null);
    setPreview(null);
    setError("");
    setFormValues((prevValues) => ({
      ...prevValues,
      productImg: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // 태그 관련 함수

  // 1. 엔터로 태그 추가하기
  const handleTagEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagValue = formValues.productTag.trim();
      if (tagValue) {
        setTags((prevTags) => [...prevTags, tagValue]); // 태그 배열에 값 넘겨주기
        setFormValues((prevValues) => ({
          ...prevValues,
          productTag: "", //입력란 초기화
        }));
      }
    }
  };

  // 2. 태그 삭제
  const handleTagDeleteBtn = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((index) => index !== tagToDelete));
  };

  useEffect(() => {
    if (!file) return;

    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);

    return () => URL.revokeObjectURL(nextPreview);
  }, [file]);

  return (
    <>
      <Header />
      <main>
        <form className={styles.addForm} action="#">
          <h1 className={styles.pageName}>상품 등록하기</h1>

          <div className={styles.labelName}>상품 이미지</div>

          <div className={styles.fileInputWrapper}>
            <label className={styles.labelName} htmlFor="addImg">
              {/* 파일 인풋 대체 div */}
              <div
                className={styles.fileAddImg}
                onClick={handleFileClick}
              ></div>
            </label>

            {/* 이미지 파일 미리보기 */}
            <div className={styles.filePreview}>
              {preview && (
                <img
                  src={preview}
                  alt="이미지 미리보기"
                  className={styles.previewImg}
                  width="282"
                  height="282"
                />
              )}
            </div>
            {/* 파일 삭제 버튼 */}
            {preview && (
              <button
                className={styles.deleteBtn}
                type="button"
                onClick={handleDeleteBtn}
              >
                <span className={styles.blind}>삭제</span>
              </button>
            )}
            <input
              id="addImg"
              className={styles.hiddenInput}
              onChange={handleFileChange}
              name="productImg"
              type="file"
              accept="image/jpeg, image/png"
              ref={fileInputRef}
            ></input>
          </div>
          {/* 파일 개수 제한 에러메시지 */}
          {error && <strong className={styles.errorMsg}>{error}</strong>}

          <label className={styles.labelName}>상품명</label>
          <input
            id="addName"
            onChange={handleChange}
            name="productName"
            placeholder="상품명을 입력해주세요"
            type="text"
          ></input>

          <label className={styles.labelName} htmlFor="addDescription">
            상품 소개
          </label>
          <textarea
            id="addDescription"
            name="productDescription"
            placeholder="상품 소개를 입력해주세요"
            onChange={handleChange}
          ></textarea>

          <label className={styles.labelName} htmlFor="addPrice">
            판매 가격
          </label>
          <input
            id="addPrice"
            name="productPrice"
            placeholder="판매 가격을 입력해주세요"
            type="text"
            value={addComma(formValues.productPrice) || ""}
            onChange={onChangeNum}
          ></input>

          <label className={styles.labelName} htmlFor="addTag">
            태그
          </label>
          <div>
            <input
              id="addTag"
              name="productTag"
              type="text"
              placeholder="태그를 입력해주세요"
              value={formValues.productTag}
              onChange={handleChange}
              onKeyDown={handleTagEnter}
            ></input>
            <div className={styles.tagWrapper}>
              {tags.map((tag, index) => (
                <span>
                  <Tag value={tag} key={index} />
                  <button
                    type="button"
                    className={styles.TagDeleteBtn}
                    onClick={() => handleTagDeleteBtn(tag)}
                  ></button>
                </span>
              ))}
            </div>
          </div>

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
