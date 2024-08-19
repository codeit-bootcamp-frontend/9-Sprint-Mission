import React, { useState } from "react";
import FileInput from "../components/FileInput";
import "./AddItem.css";
import icX from "../assets/img/ic_X.png";

export default function AddItem() {
  const [productData, setProductData] = useState({
    imgFile: "",
    title: "",
    description: "",
    price: "",
    tags: ["티셔츠", "상의"],
  });

  const [tag, setTag] = useState();
  const isAllInput =
    productData.title !== "" &&
    productData.price !== "" &&
    productData.description !== "" &&
    productData.tags.length !== 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleChange = (name, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = (name) => {
    const newTags = productData.tags.filter((tag) => tag !== name);
    setProductData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setProductData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }));
      setTag("");
    }
  };

  const handleTagInputChange = (event) => {
    const { value } = event.target;
    setTag(value);
  };

  return (
    <section id='additem' className='container'>
      <div className='header'>
        <h2 className='title'>상품 등록하기</h2>
        <button className={isAllInput ? "active" : ""}>등록</button>
      </div>
      <h3>상품 이미지</h3>
      <form className='form'>
        <FileInput value={productData.imgFile} onChange={handleChange} />
        <label htmlFor='title'>상품명</label>
        <input
          placeholder='상품명을 입력해주세요.'
          name='title'
          value={productData.title}
          onChange={handleInputChange}
        />
        <label htmlFor='description'>상품 소개</label>
        <textarea
          placeholder='상품 소개를 입력해주세요.'
          name='description'
          value={productData.description}
          rows='20'
          onChange={handleInputChange}
        />
        <label htmlFor='description'>판매가격</label>
        <input
          placeholder='판매 가격을 입력해주세요.'
          name='price'
          value={productData.price}
          onChange={handleInputChange}
        />
        <label htmlFor='tag'>태그</label>
        <input
          placeholder='태그를 입력해주세요.'
          name='tag'
          value={tag}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyDown}
        />
        {productData.tags.length !== 0 && (
          <div className='tags-wrapper'>
            {productData.tags.map((tag) => (
              <li key={tag} className='tag-wrapper'>
                <span className='tag'>{"#" + tag}</span>
                <img
                  src={icX}
                  alt='태그 삭제버튼'
                  onClick={() => handleDelete(tag)}
                />
              </li>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
