import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AddItemPage.css';
import '../MarketPage/MarketPage.css';
import { ImageUpLoad } from 'components/ImageUpLoad';
import styled from 'styled-components';
import { TagChip } from 'components/TagChip';

const InputStyle = styled.input`
  border-radius: 12px;
  background-color: var(--gray-100);
  padding: 16px 24px;
  color: #1f2937;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  &::placeholder {
    color: var(--gray-400);
  }
`;
const TextAreaStyle = styled.textarea`
  border-radius: 12px;
  background-color: var(--gray-100);
  padding: 16px 24px;
  height: 282px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  &::placeholder {
    color: var(--gray-400);
  }
`;

const ErrorMessage = styled.span`
  color: #f74747;
  font-size: 14px;
  margin-top: 8px;
`;

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productTags: '',
  });
  const [priceError, setPriceError] = useState(false);
  const [tags, setTags] = useState([]);

  const isFormValid = formData.productName.trim() !== '' && formData.productDescription.trim() !== '' && formData.productPrice.trim() !== '' && tags.length > 0 && !priceError;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productPrice') {
      const regex = /^[0-9]*$/;
      if (value === '' || (regex.test(value) && Number(value) >= 0)) {
        setPriceError(false);
      } else {
        setPriceError(true);
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formData.productTags.trim() !== '') {
      e.preventDefault();
      setTags([...tags, formData.productTags.trim()]);
      setFormData({
        ...formData,
        productTags: '',
      });
    }
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="AddItemPage">
      <div className="Label-Nav">
        <p>전체 상품</p>
        <div className="Label-wrap">
          <button variant="contained" className="Register-Button" disabled={!isFormValid}>
            등록
          </button>
        </div>
      </div>
      <form className="AddItem-Form">
        <div className="Input-wrap">
          <p>상품이미지</p>
          <ImageUpLoad />
        </div>
        <div className="Input-wrap">
          <p>상품명</p>
          <InputStyle type="text" name="productName" placeholder="상품명을 입력해주세요" value={formData.productName} onChange={handleChange} />
        </div>
        <div className="Input-wrap">
          <p>상품 소개</p>
          <TextAreaStyle name="productDescription" placeholder="상품 소개를 입력해주세요" value={formData.productDescription} onChange={handleChange}></TextAreaStyle>
        </div>
        <div className="Input-wrap">
          <p>판매가격</p>
          <InputStyle type="text" name="productPrice" placeholder="판매 가격을 입력해주세요" value={formData.productPrice} onChange={handleChange} />
          {priceError && <ErrorMessage>판매가격은 0 이상의 숫자여야 합니다.</ErrorMessage>}
        </div>
        <div className="Input-wrap">
          <p>태그</p>
          <InputStyle type="text" name="productTags" placeholder="태그를 입력해주세요" value={formData.productTags} onChange={handleChange} onKeyDown={handleKeyDown} />
          <TagChip tags={tags} onDelete={handleDeleteTag} />
        </div>
      </form>
    </div>
  );
};

export default AddItemPage;
