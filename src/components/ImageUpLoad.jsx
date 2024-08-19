import { useState, useRef } from 'react';
import ic_plus from '../api/assets/images/icons/ic_plus.png';
import ic_imgdel from '../api/assets/images/icons/ic_imgdel.png';
import styled from 'styled-components';
import '../pages/AddItemPage/AddItemPage.css';

const StyledImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledImage = styled.img`
  border-radius: 12px;
  width: 282px;
  height: 100%;
  @media (max-width: 1200px) {
    width: 168px;
    height: 168px;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: var(--gray-400);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  cursor: pointer;
`;

const DelIcon = styled.img`
  position: relative;
  width: 8px;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 282px;
  height: 100%;
  border-radius: 12px;
  background-color: #f3f4f6;
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-400);
  cursor: pointer;
  @media (max-width: 1200px) {
    width: 168px;
    height: 168px;
  }
`;

const ErrorMessage = styled.span`
  color: #f74747;
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const ImageUpLoad = () => {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const [error, setError] = useState(false);
  const fileInputRef = useRef(null);

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    if (files.length > 3) {
      setError(true);
      return;
    }
    setError(false);
    const newUploadUrls = [];
    const readers = [];

    for (let i = 0; i < files.length && i < 3; i++) {
      const reader = new FileReader();
      readers.push(reader);
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        newUploadUrls.push(reader.result);
        if (newUploadUrls.length === readers.length) {
          setUploadImgUrls(newUploadUrls);
        }
      };
    }
  };

  const handleDeleteImage = (index, e) => {
    e.preventDefault();
    const newUploadImgUrls = uploadImgUrls.filter((_, i) => i !== index);
    setUploadImgUrls(newUploadImgUrls);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // input 초기화
    }
  };

  return (
    <div>
      <div className="ImageUpLoad">
        <div>
          <StyledLabel htmlFor="fileUpload">
            <img src={ic_plus} alt="" width="48" />
            이미지 등록
          </StyledLabel>
        </div>
        {uploadImgUrls.map((url, index) => (
          <StyledImageContainer key={index}>
            <StyledImage src={url} alt={`img-${index}`} />
            <DeleteButton onClick={(e) => handleDeleteImage(index, e)}>
              <DelIcon src={ic_imgdel} alt="delete" />
            </DeleteButton>
          </StyledImageContainer>
        ))}
        <StyledInput id="fileUpload" type="file" accept="image/*" multiple onChange={onchangeImageUpload} ref={fileInputRef} />
      </div>
      {error && <ErrorMessage>*이미지 등록은 최대 3개까지 가능합니다.</ErrorMessage>}
    </div>
  );
};
