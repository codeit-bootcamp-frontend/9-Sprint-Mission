import { useState } from 'react';
import ic_plus from '../api/assets/images/icons/ic_plus.png';
import ic_imgdel from '../api/assets/images/icons/ic_imgdel.png';
import styled from 'styled-components';

const StyledImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 10px;
`;

const StyledImage = styled.img`
  border-radius: 12px;
  width: 282px;
  height: 100%;
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
`;

const ErrorMessage = styled.span`
  color: #f74747;
  font-size: 16px;
  font-weight: 400;
  margin-top: 16px;
`;

export const ImageUpLoad = () => {
  const [uploadImgUrls, setUploadImgUrls] = useState([]);
  const [error, setError] = useState(false);

  const onchangeImageUpload = (e) => {
    const { files } = e.target;
    if (files.length > 3) {
      console.log('이미지는 3개까지');
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

  const handleDeleteImage = (index) => {
    const newUploadImgUrls = uploadImgUrls.filter((_, i) => i !== index);
    setUploadImgUrls(newUploadImgUrls);
  };

  return (
    <div className="ImageUpLoad">
      <div className="Img-Error">
        <StyledLabel htmlFor="fileUpload">
          <img src={ic_plus} alt="" width="48" />
          이미지 등록
        </StyledLabel>
        {error && <ErrorMessage>*이미지 등록은 최대 3개까지 가능합니다.</ErrorMessage>}
      </div>
      {uploadImgUrls.map((url, index) => (
        <StyledImageContainer key={index}>
          <StyledImage src={url} alt={`img-${index}`} />
          <DeleteButton onClick={() => handleDeleteImage(index)}>
            <DelIcon src={ic_imgdel} alt="delete" />
          </DeleteButton>
        </StyledImageContainer>
      ))}
      <StyledInput id="fileUpload" type="file" accept="image/*" multiple onChange={onchangeImageUpload} />
    </div>
  );
};
