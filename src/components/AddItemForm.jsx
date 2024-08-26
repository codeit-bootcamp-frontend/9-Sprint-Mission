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
  const [tags, setTags] = useState([]);
  // const [input, setInput] = useState("");
  // const [isDisabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    //추후 미션에서 API를 통해 등록한다
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    // setDisabled(
    //   !values.title || !values.content || !values.price || !values.tag
    //     ? true
    //     : false
    // );
  };

  const isDisabled =
    !values.title || !values.content || !values.price || !tags.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onPressEnter = (event) => {
    if (event.nativeEvent.isComposing) return;
    const inputString = values.tag.trim();
    if (event.key === "Enter" && inputString) {
      event.preventDefault(); // 엔터 키가 눌렸을 때 submit 되지 않도록
      addTag(inputString);
      setValues({ ...values, tag: "" });
    }
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
        <div>
          <label htmlFor="productName">상품명</label>
          <input
            name="title"
            value={values.title}
            id="productName"
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="productDescription">상품 소개</label>
          <textarea
            name="content"
            value={values.content}
            id="productDescription"
            placeholder="상품 소개를 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="productPrice">판매가격</label>
          <input
            name="price"
            value={values.price}
            id="productPrice"
            type="text"
            placeholder="판매 가격을 입력해주세요"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="productTag">태그</label>
          <input
            name="tag"
            value={values.tag}
            id="productTag"
            type="text"
            placeholder="태그를 입력해주세요"
            onChange={handleInputChange}
            onKeyDown={onPressEnter}
          />
        </div>
        {tags.length > 0 && (
          <div className={cx("tagArr")}>
            {tags.map((tag) => (
              <div key={`tag-${tag}`} className={cx("tag")}>
                <span className={cx("tagText")}>{`#${tag}`}</span>
                <button
                  onClick={() => removeTag(tag)}
                  label={`${tag} 태그`}
                  className={cx("tagRemoveBtn")}
                ></button>
              </div>
            ))}
          </div>
        )}
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
