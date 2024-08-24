import { useState } from "react";
import "../css/Additem.css";
import cancelButton from "../svg/cancelbutton.svg";
import Input from "./Input";

const initalFormValues = {
  name: "",
  tags: [],
  price: Number(""),
  images: null,
  description: "",
};

function Additem() {
  const [values, setValues] = useState(initalFormValues);
  const [tagInput, setTagInput] = useState("");

  //이미지를 제외한 모든 입력이 채워져있어야 등록버튼이 활성화되는 로직
  const { name, tags, price, description } = values;
  const isFormValid =
    name.trim() !== "" &&
    //tags는 배열이기 때문에 trim이 아닌 배열의 length로 조건을 수정
    tags.length > 0 &&
    price.trim() !== "" &&
    description.trim() !== "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setValues((prev) => ({ ...prev, images: imageUrl }));
    };

    reader.readAsDataURL(file);
  };

  //반복되는 구문 변수화
  const updateValues = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateValues(name, value);
  };

  const handleRemoveImage = (e) => {
    updateValues("images", null);
    e.target.value = ""; // 파일 입력 초기화
  };

  //태그에 관련한 함수
  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // 폼 제출 방지
      setValues((prevValues) => ({
        ...prevValues,
        tags: [...prevValues.tags, tagInput.trim()],
      }));
      setTagInput(""); // 태그 입력 필드 초기화
    }
    if (e.code === "Space") {
      e.preventDefault();
    }
  };

  const handleRemoveTag = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 제출 방지

    if (!values.images) {
      const userNotImgUprode = window.confirm(
        "등록상품에 이미지가 존재하지 않습니다. 그래도 등록하시겠습니까?",
      );
      if (!userNotImgUprode) {
        return; // 사용자가 취소를 눌렀을 경우 제출 중지
      }
    }

    // 폼 정상 제출 확인
    // console.log("폼이 제출되었습니다:", values);

    //폼 제출 후 초기화
    setValues(initalFormValues);
  };

  return (
    <>
      <form className="additem-wrap" onSubmit={handleSubmit}>
        <h2 className="submit-wrap">
          상품 등록하기
          <button
            className="product-submit-button"
            type="submit"
            disabled={!isFormValid}
          >
            등록
          </button>
        </h2>
        <div className="product-wraps">
          <div className="product-wrap">
            <label htmlFor="product-img">상품 이미지</label>
            <div className="product-wrap imgs">
              <Input
                className={`custom-file-upload ${
                  values.images ? "disabled-label" : ""
                }`}
                forId="product-img"
                type="file"
                onChange={handleImageChange}
                disabled={values.images}
              />
              {values.images && (
                <div className="preview-img">
                  <img
                    src={values.images}
                    alt="미리보기 이미지"
                    className="image-preview"
                  />
                  <img
                    src={cancelButton}
                    className="remove-button"
                    alt="이미지 삭제"
                    onClick={handleRemoveImage}
                  />
                </div>
              )}
            </div>
            {values.images && (
              <p className="image-message">
                *이미지 등록은 최대 1개까지 가능합니다.
              </p>
            )}
          </div>
          <div className="product-wrap">
            <Input
              name="name"
              value={values.name}
              forId="product-name"
              placeholder="상품명을 입력해주세요"
              onChange={handleChange}
              title="상품명"
            />
          </div>
          <div className="product-wrap">
            <Input
              name="description"
              value={values.description}
              forId="product-content"
              placeholder="상품 소개를 입력해주세요"
              onChange={handleChange}
              title="상품소개"
              type="textarea"
            />
          </div>
          <div className="product-wrap">
            <Input
              name="price"
              value={values.price}
              forId="product-price"
              placeholder="판매 가격을 입력해주세요"
              onChange={handleChange}
              type="number"
              title="판매 가격"
            />
          </div>
          <div className="product-wrap">
            <Input
              name="tags"
              value={tagInput}
              forId="product-tag"
              placeholder="태그를 입력해주세요"
              onChange={handleTagInput}
              onKeyDown={handleKeyDown}
              title="태그"
            />
            <div className="tag-list">
              {values.tags.map((tag, index) => (
                <div key={index} className="tag-item">
                  {`#${tag}`}
                  <img
                    src={cancelButton}
                    alt="태그 취소 버튼"
                    className="remove-button"
                    onClick={() => handleRemoveTag(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Additem;
