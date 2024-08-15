import { useState } from "react";
import "./add-item-form.css";
import addProducts from "../../../shared/api/items/add-item";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTagsChange = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    setIsFormValid(name && description && price > 0 && image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tags", JSON.stringify(tags));
    // https://panda-market-api.vercel.app/images/upload
    // 위 API 로 먼저 image를 올린 후에 url 을 받아서 image 항목에 입력함
    if (image) {
      formData.append("image", image);
    }

    const responseInfo = await addProducts(formData);
    console.log(responseInfo.data);
  };

  return (
    <form className="add-item-container" onSubmit={handleSubmit}>
      <div className="item-header">
        <h2>상품 등록하기</h2>
        <button className="submit-button" type="submit" disabled={!isFormValid}>
          등록
        </button>
      </div>
      <div className="image-upload">
        <div>
          <input
            type="file"
            onChange={handleImageChange}
            onBlur={validateForm}
          />
        </div>
        {image && (
          <div>
            <img src={URL.createObjectURL(image)} alt="상품 이미지" />
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          onBlur={validateForm}
          placeholder="상품명을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          onBlur={validateForm}
          placeholder="상품 소개를 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">판매가격</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
          onBlur={validateForm}
          placeholder="판매 가격을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">태그</label>
        <input
          type="text"
          id="tags"
          value={tags.join(", ")}
          onChange={handleTagsChange}
          placeholder="태그를 입력해주세요"
        />
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            #{tag}
          </span>
        ))}
      </div>
    </form>
  );
};

export default AddItemForm;
