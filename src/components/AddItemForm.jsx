import styles from "./AddItemForm.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import FileInput from "./FileInput";

const cx = classNames.bind(styles);

function AddItemForm() {
  const [values, setValues] = useState({
    title: "",
    content: "",
    price: "",
    tag: "",
    imgFile: null,
  });
  const [isDisabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    //추후 미션에서 API를 통해 등록한다
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setDisabled(
      !values.title || !values.content || !values.price || !values.tag
        ? true
        : false
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className={cx("formContainer")}>
      <h2 className={cx("addTitle")}>상품 등록하기</h2>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <form className={cx("addForm")} onSubmit={handleSubmit}>
        <label htmlFor={cx("productName")}>상품명</label>
        <input
          name="title"
          value={values.title}
          id={cx("productName")}
          type="text"
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
        <label htmlFor={cx("productDescription")}>상품 소개</label>
        <textarea
          name="content"
          value={values.content}
          id={cx("productDescription")}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
        />
        <label htmlFor={cx("productPrice")}>판매가격</label>
        <input
          name="price"
          value={values.price}
          id={cx("productPrice")}
          type="text"
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
        />
        <label htmlFor={cx("productTag")}>태그</label>
        <input
          name="tag"
          id={cx("productTag")}
          type="text"
          placeholder="태그를 입력해주세요"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className={cx("resigterBtn", `${isDisabled ? "" : "submitBtn"}`)}
          disabled={isDisabled}
        >
          등록
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;
