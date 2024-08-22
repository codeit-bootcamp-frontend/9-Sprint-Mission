import "./ItemForm.css";
import Tag from "../Tag/Tag";
import LabelInput from "../Label/LabelInput";
import Label from "../Label/Label";

function ItemForm({
  values,
  handleChange,
  handleInputChange,
  handleTagChange,
  onSubmit,
}) {
  const isFormValid = () => {
    return (
      values.title !== "" &&
      values.content !== "" &&
      values.price !== "" &&
      values.tags.length !== 0
    );
  };
  return (
    <form onSubmit={onSubmit} className="ItemForm-main">
      <div className="AddItem-bar">
        <h2 className="AddItem-bar-title">상품 등록하기</h2>
        <button
          className="AddItem-bar-button"
          type="submit"
          disabled={!isFormValid()}
        >
          등록
        </button>
      </div>

      <LabelInput
        category="image"
        title="상품이미지"
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />

      <Label
        category="title"
        title="상품명"
        name="title"
        placeholder="상품명을 입력해주세요"
        value={values.title}
        onChange={handleInputChange}
      />

      <label htmlFor="content" className="ItemForm-main-title">
        상품 소개
      </label>
      <textarea
        name="content"
        placeholder="상품 소개를 입력해주세요"
        className="ItemForm-main-textarea"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>

      <Label
        category="price"
        title="판매가격"
        name="price"
        placeholder="판매 가격을 입력해주세요"
        value={values.price}
        onChange={handleInputChange}
      />

      <label htmlFor="tags" className="ItemForm-main-title">
        태그
      </label>
      <Tag
        name="tags"
        className="ItemForm-main-input Tag-main-input"
        values={values.tags}
        onChange={handleTagChange}
      />
    </form>
  );
}

export default ItemForm;
