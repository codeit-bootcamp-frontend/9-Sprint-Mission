import "./ItemForm.css";
import FileInput from "../FileInput/FileInput";
import Tag from "../Tag/Tag";
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
      <label htmlFor="image" className="ItemForm-main-title">
        상품이미지
      </label>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <label htmlFor="title" className="ItemForm-main-title">
        상품명
      </label>
      <input
        name="title"
        placeholder="상품명을 입력해주세요"
        className="ItemForm-main-input"
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

      <label htmlFor="price" className="ItemForm-main-title">
        판매가격
      </label>
      <input
        name="price"
        type="text"
        placeholder="판매 가격을 입력해주세요"
        className="ItemForm-main-input"
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
