import React, { ChangeEvent, FormEvent, useState } from "react";
import { createAddItem } from "../../Api";
import FileInput from "./FileInput";
import styles from "./Additem.module.css";

interface ItemValues {
  imgFile: File | null;
  title: string;
  content: string;
  price: string;
  hashtag: string;
}
//type HashtagList = string[];
type SubmittingError = Error | null;

const INITIAL_VALUES: ItemValues = {
  imgFile: null,
  title: "",
  content: "",
  price: "",
  hashtag: "",
};

function Additem() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittingError, setSubmittingError] = useState<SubmittingError>(null);
  const [values, setValues] = useState<ItemValues>(INITIAL_VALUES);
  const [hashtags, setHashtags] = useState<string[]>([]);

  // 상품명, 상품소개, 판매가격, 태그
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    // 숫자만 허용하는 경우
    if (name === "price" && /^\d*$/.test(value)) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else if (name !== "price") {
      // 숫자만 허용하지 않는 다른 입력 필드
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // 상품 이미지
  const handleChange = (name: string, value: File | null): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 입력값이 변경된 후 해시태그를 생성하여 상태에 저장
  const handleGenerateHashtag = (): void => {
    const tags = values.hashtag;
    if (tags.trim() === "") return; // trim > 문자열의 공백 제거 메소드
    const newHashtag = `#${tags.trim()}`;
    setHashtags([...hashtags, newHashtag]);
    setValues((prevValues) => ({
      // 기존 입력 필드 초기화
      ...prevValues,
      hashtag: "",
    }));
  };

  // 해시태그 엔터 키를 눌렀을 때 호출되는 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerateHashtag();
    }
  };

  // 해시태그 삭제 버튼
  const handleClearClick = (index: number) => {
    setHashtags((prevHashtags) =>
      prevHashtags.filter((prevHashtags, i) => i !== index)
    );
  };

  // Additem submit (데이터 전송이 되지않아 추후 수정 필요)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile as Blob);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("price", values.price);
    formData.append("hashtag", hashtags.join(",")); // 해시태그 목록을 문자열로 변환하여 추가
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      await createAddItem(formData);
    } catch (error) {
      setSubmittingError(error as Error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    setValues(INITIAL_VALUES);
    setHashtags([]); // 해시태그 목록 초기화
  };

  // 입력값으로 버튼 활성화
  const isFormValid = (): boolean => {
    const { title, content, price } = values;
    // trim은 공백만 입력했을 경우 빈 문자열로 간주되기 때문
    return (
      title.trim() !== "" &&
      content.trim() !== "" &&
      Number(price) > 0 &&
      hashtags.length > 0
    );
  };

  return (
    <>
      <form id="Additem" className={styles.Additem} onSubmit={handleSubmit}>
        <div className="wrap_inner">
          <div className="title-wrap">
            <h2 className="pagetitle">상품 등록하기</h2>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className={`${styles.btnAdditem} ${
                isFormValid() ? styles.active : ""
              }`}
            >
              등록
            </button>
            {submittingError?.message && <div>{submittingError.message}</div>}
          </div>
          <div>
            <div>
              <h3 className="subtitle">상품 이미지</h3>
              <FileInput
                name="imgFile"
                value={values.imgFile}
                onChange={handleChange}
              />
            </div>
            <div>
              <h3 className="subtitle">상품명</h3>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleInputChange}
                className="form_input"
                placeholder="상품명을 입력해주세요"
              />
              <h3 className="subtitle">상품 소개</h3>
              <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
                className={styles.textareaProduct}
                placeholder="상품 소개를 입력해주세요"
              />
              <h3 className="subtitle">판매 가격</h3>
              <input
                type="text"
                name="price"
                value={values.price}
                onChange={handleInputChange}
                className="form_input"
                placeholder="판매 가격을 입력해주세요"
              />
              <h3 className="subtitle">태그</h3>
              <input
                type="text"
                name="hashtag"
                value={values.hashtag}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="form_input"
                placeholder="태그를 입력해주세요"
              />
              <ul className={styles.hashtag}>
                {hashtags.map((hashtag, index) => (
                  <li key={index}>
                    <span>{hashtag}</span>
                    <button
                      type="button"
                      onClick={() => handleClearClick(index)}
                      className="btnCancel"
                    >
                      cancel
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Additem;
