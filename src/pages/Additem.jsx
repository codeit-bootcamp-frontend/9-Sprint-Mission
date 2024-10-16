import { useState } from "react";
import plusIcon from "../assets/image/ic_plus.svg";
import deleteIcon from "../assets/image/ic_delete.svg";

export default function Additems() {
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // if (file && !imagePreview) {
    //   const imageUrl = URL.createObjectURL(file);
    //   setImagePreview(imageUrl);
    // }

    if (file && !imagePreview) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputTag.trim()) {
      setTags([...tags, `#${inputTag}`]);
      setInputTag("");
    }
  };

  const handleDelete = (indexToDelte) => {
    const nextTags = tags.filter((_, index) => index !== indexToDelte);
    setTags(nextTags);
  };

  const isFormValid = !(
    inputName &&
    inputDescription &&
    inputPrice &&
    tags.length > 0
  );

  return (
    <div className="page-size text-gray-800 flex flex-col gap-6 Mobile:px-[14px] Tablet:px-6 mt-6 Tablet:mt-[16px] mb-[70px] Tablet:mb-[78px] PC:mb-[59px] text-2lg">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">상품 등록하기</h3>
        <button
          disabled={isFormValid}
          className={`${
            isFormValid ? "bg-gray400" : "bg-primary100"
          }  text-lg font-semibold w-[74px] h-[42px] rounded-lg text-white`}
        >
          등록
        </button>
      </div>

      <div className="flex flex-col">
        <label htmlFor="productImg" className="text-2lg font-bold">
          상품 이미지
        </label>
        <input
          id="productImg"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          placeholder="이미지 등록"
          // disabled={!!imagePreview}
        />
        <div className="flex gap-[10px] PC:gap-6">
          <label
            htmlFor="productImg"
            className="input-style w-[calc((100%-10px)/2)] Tablet:w-[168px] PC:w-[282px] aspect-[1/1] flex flex-col gap-3 text-lg text-gray-400 items-center justify-center"
          >
            <img
              src={plusIcon}
              alt="이미지 등록 아이콘"
              className="w-12 h-12"
            />
            이미지 등록
          </label>
          <div className="w-[calc((100%-10px)/2)] Tablet:w-[168px] PC:w-[282px] relative">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="등록한 이미지"
                className="w-full aspect-[1/1] rounded-xl mt-[16px] object-cover "
              />
            )}
            {imagePreview && (
              <img
                src={deleteIcon}
                alt="삭제 아이콘"
                onClick={() => {
                  setImagePreview(null);
                  setError(false);
                }}
                className="rounded-full bg-gray-400 p-[5px] inline-block ml-2 absolute right-3 top-7"
              />
            )}
          </div>
        </div>
        {error && (
          <p className="text-lg text-error mt-4">
            *이미지 등록은 최대 1개까지 가능합니다.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="productName" className="text-2lg font-bold">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="input-style"
          placeholder="상품명을 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="productDescription" className="text-2lg font-bold">
          상품 소개
        </label>
        <textarea
          id="productDescription"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          className="input-style h-[282px]"
          placeholder="상품 소개를 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="productPrice" className="text-2lg font-bold">
          판매가격
        </label>
        <input
          id="productPrice"
          type="text"
          value={inputPrice ? Number(inputPrice).toLocaleString() : ""}
          onChange={(e) => {
            setInputPrice(Number(e.target.value.replaceAll(",", "")));
          }}
          className="input-style"
          placeholder="판매가격을 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="productTag" className="text-2lg font-bold">
          태그
        </label>
        <input
          id="productTag"
          type="text"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-style"
          placeholder="태그를 입력해주세요"
        />
      </div>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray100 rounded-[26px] inline-block py-[5px] pl-4 pr-3"
          >
            {tag}
            <img
              src={deleteIcon}
              alt="삭제 아이콘"
              onClick={() => handleDelete(index)}
              className="rounded-full bg-gray-400 p-[5px] inline-block ml-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
