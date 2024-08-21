import { useEffect, useState } from "react";
import "./add-item-form.css";
import addProducts from "../../../shared/api/items/add-item";
import ImageUpload from "../../../shared/ui/image-upload";
import InputWithLabel from "../../../shared/ui/input-with-lable";
import TextareaWithLabel from "../../../shared/ui/textarea-with-label";
import DeleteImage from "../../../shared/assets/images/icons/ic_delete.svg";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (uploadedImage) => {
    if (image) {
      setImageError("*이미지 등록은 최대 1개까지 가능합니다.");
    } else {
      setImage(uploadedImage);
      setImageError("");
    }
  };

  const handleImageRemove = (clearFileInputRef) => {
    try {
      setImage(null); // 이미지 상태를 null로 설정하여 삭제
      setImageError(""); // 에러 메시지 초기화
      clearFileInputRef();
    } catch (error) {
      console.error("Failed to remove image: ", error);
    }
  };

  const isFormFilled = name && description && price > 0 && tags.length > 0;

  useEffect(() => {
    setIsFormValid(isFormFilled);
  }, [isFormFilled]);

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

    formData.forEach((value, key) => {
      console.log("key: " + key + ", value: " + value);
    });
    //const responseInfo = await addProducts(formData);
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
        <ImageUpload
          id="imageUpload"
          name="imageUpload"
          image={image}
          setImage={handleImageUpload}
          onRemoveImage={handleImageRemove}
        />
        {imageError && <div className="image-error-message">{imageError}</div>}
      </div>

      <InputWithLabel
        id="name"
        label="상품명"
        value={name}
        onChange={handleNameChange}
        placeholder="상품명을 입력해주세요"
      />

      <TextareaWithLabel
        id="description"
        label="상품 소개"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="상품 소개를 입력해주세요"
      />

      <InputWithLabel
        id="price"
        label="판매가격"
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="판매 가격을 입력해주세요"
      />

      <div className="form-group">
        <label htmlFor="tags">태그</label>
        <br />
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력 후 Enter를 눌러주세요"
        />
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag-item">
            #{tag}
            <button
              type="button"
              className="remove-tag-button"
              onClick={() => handleTagRemove(index)}
            >
              <DeleteImage alt="Delete" />
            </button>
          </span>
        ))}
      </div>
    </form>
  );
};

export default AddItemForm;
