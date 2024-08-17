import { NavLink } from 'react-router-dom';
import './AddItemPage.css';
import '../MarketPage/MarketPage.css';
import { ImageUpLoad } from 'components/ImageUpLoad';
import styled from 'styled-components';

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
const AddItemPage = () => {
  return (
    <div className="AddItemPage">
      <div className="Label-Nav">
        <p>전체 상품</p>
        <div className="Label-wrap">
          <NavLink to="/additem">
            <button variant="contained" className="Register-Button">
              등록
            </button>
          </NavLink>
        </div>
      </div>
      <form className="AddItem-Form">
        <div className="Input-wrap">
          <p>상품이미지</p>
          <ImageUpLoad />
        </div>
        <div className="Input-wrap">
          <p>상품명</p>
          <InputStyle type="text" placeholder="상품명을 입력해주세요" />
        </div>
        <div className="Input-wrap">
          <p>상품 소개</p>
          <TextAreaStyle name="" id="" placeholder="상품 소개를 입력해주세요"></TextAreaStyle>
        </div>
        <div className="Input-wrap">
          <p>판매가격</p>
          <InputStyle type="number" placeholder="판매 가격을 입력해주세요" />
        </div>
        <div className="Input-wrap">
          <p>태그</p>
          <InputStyle type="text" placeholder="태그를 입력해주세요" />
        </div>
      </form>
    </div>
  );
};
export default AddItemPage;
