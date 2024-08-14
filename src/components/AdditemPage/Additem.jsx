import { useState } from 'react';
import FileInput from './components/FileInput';

const Additem = () => {
  const [value, setValue] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
  };

  return (
    <section className="Additem">
      <div className="container">
        <form className="AdditemForm">
          <div className="AdditemForm-submit-wrap">
            <h2 className="AdditemForm-main-tit">상품 등록하기</h2>
            <button className="submit-button">등록</button>
          </div>
          <FileInput name="imgFile" value={value} />
          <div className="AdditemForm-input-wrap">
            <label htmlFor="name" className="AdditemForm-sub-tit">
              상품명
            </label>
            <input id="name" name="name" placeholder="상품명을 입력해주세요" />
          </div>
          <div className="AdditemForm-input-wrap">
            <label htmlFor="content" className="AdditemForm-sub-tit">
              상품 소개
            </label>
            <textarea
              className="AdditemForm-content"
              id="content"
              name="content"
              placeholder="상품 소개를 입력해주세요"
            ></textarea>
          </div>
          <div className="AdditemForm-input-wrap">
            <label htmlFor="price" className="AdditemForm-sub-tit">
              판매가격
            </label>
            <input id="price" name="price" placeholder="판매 가격을 입력해주세요" />
          </div>
          <div className="AdditemForm-input-wrap">
            <label htmlFor="tag" className="AdditemForm-sub-tit">
              태그
            </label>
            <input id="tag" name="tag" placeholder="태그를 입력해주세요" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Additem;
