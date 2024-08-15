import { useEffect, useState } from "react";
import "./add-item-form.css";
import addProducts from "../../../shared/api/items/add-item";
import ImageUpload from "../../../shared/ui/image-upload";

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

  useEffect(() => {
    const isFormFilled = name && description && price > 0 && tags.length > 0;
    setIsFormValid(isFormFilled);
  }, [name, description, price, tags]);

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
      formData.append("images", [image]);
    }

    const responseInfo = await addProducts(formData);
    console.log(responseInfo.data);
  };

  return (
    <form className="add-item-container" onSubmit={handleSubmit}>
      <div className="item-header">
        <div className="item-title">상품 등록하기</div>
        <button className="submit-button" type="submit" disabled={!isFormValid}>
          등록
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="imageUpload">상품 이미지</label>
        <br />
        <ImageUpload id="imageUpload" image={image} setImage={setImage} />
      </div>
      <div className="form-group">
        <label htmlFor="name">상품명</label>
        <br />
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="상품명을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">상품 소개</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="상품 소개를 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">판매가격</label>
        <br />
        <input
          type="number"
          id="price"
          value={price}
          onChange={handlePriceChange}
          placeholder="판매 가격을 입력해주세요"
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">태그</label>
        <br />
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
