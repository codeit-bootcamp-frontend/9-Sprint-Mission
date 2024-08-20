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

    /*
    FileReader: JavaScript의 API로, 파일을 읽어 들여 다양한 형식(텍스트, 데이터 URL 등)으로 변환할 수 있습니다.
    reader: 모든 FileReader 객체를 추적하기 위해 배열에 저장
    readAsDataURL: 파일을 Base64 인코딩된 문자열로 변환하고, 그 결과를 reader.result에 저장합니다.
    onloadend: 파일 읽기가 완료되면 자동으로 호출되는 이벤트
    */
    for (let i = 0; i < files.length && i < 3; i++) {
      const reader = new FileReader();
      readers.push(reader);
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        newUploadUrls.push(reader.result); // 변환된 이미지 URL을 배열에 저장해 나중에 상태에 반영
        if (newUploadUrls.length === readers.length) {
          // 현재까지 읽은 파일의 수(newUploadUrls.length)와 전체 파일의 수(readers.length)가 같은지 확인합니다.
          // 모든 파일이 정상적으로 읽혔는지 확인
          setUploadImgUrls(newUploadUrls); // 이미지 URL을 상태에 반영하여 이미지를 화면에 표시
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
