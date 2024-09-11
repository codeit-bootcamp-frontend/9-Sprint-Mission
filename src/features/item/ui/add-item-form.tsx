import { useEffect, useState, useRef } from "react";
import "./add-item-form.css";
import addProducts from "../api/add-products";
import ImageUpload from "../../../shared/ui/image-upload";
import InputWithLabel from "../../../shared/ui/input-with-label";
import TextareaWithLabel from "../../../shared/ui/textarea-with-label";
import { ReactComponent as DeleteImage } from "../../../shared/assets/images/icons/ic_delete.svg";
import { ProductFormData } from "../types/product-form-data";

const AddItemForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const clearFileInputRef = useRef<() => void>(() => {});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(Number(e.target.value));
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagInput(e.target.value);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (uploadedImage: string) => {
    if (image) {
      setImageError("*이미지 등록은 최대 1개까지 가능합니다.");
    } else {
      setImage(uploadedImage);
      setImageError("");
    }
  };

  const handleImageRemove = () => {
    try {
      setImage(null); // 이미지 상태를 null로 설정하여 삭제
      setImageError(""); // 에러 메시지 초기화
      if (clearFileInputRef.current) {
        clearFileInputRef.current(); // 파일 입력 초기화
      }
    } catch (error) {
      console.error("Failed to remove image: ", error);
    }
  };

  const isFormFilled: boolean =
    Boolean(name) && // 문자열이 비어 있지 않으면 true
    Boolean(description) && // description이 비어 있지 않으면 true
    price > 0 &&
    tags.length > 0;

  useEffect(() => {
    setIsFormValid(isFormFilled);
  }, [isFormFilled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const formData: ProductFormData = {
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: image ? [image] : [], // 이미지가 있을 경우 배열로 추가
    };

    console.log(formData);

    // 실제 API 요청
    const responseInfo = await addProducts(formData);
    if (responseInfo) {
      console.log("상품 등록 성공", responseInfo);
    } else {
      console.error("상품 등록 실패");
    }
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
              <DeleteImage />
            </button>
          </span>
        ))}
      </div>
    </form>
  );
};

export default AddItemForm;
