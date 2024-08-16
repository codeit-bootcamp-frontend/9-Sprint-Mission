import "./ItemForm.css";
import FileInput from "../FileInput/FileInput";
import Tag from "../Tag/Tag";
function ItemForm({
  values,
  handleChange,
  handleInputChange,
  handleTagChange,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit} className="ItemForm-main">
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
