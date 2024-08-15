import { useEffect, useState } from 'react';
import FileInput from './FileInput';

const INITIAL_VALUES = {
  imgFile: null,
  title: '',
  price: 0,
  content: '',
  tag: '',
};

const AdditemForm = ({ initialValues = INITIAL_VALUES }) => {
  const [value, setValue] = useState(initialValues);
  const [isDisabled, setIsDisabled] = useState(false);

  // 폼 필드 변경 처리 => name: 필드의 이름, value: 새로운 값
  const handleChange = (name, value) => {
    // 기존의 상태를 복사하고, 지정된 name에 해당하는 값을 새로 전달된 value로 업데이트
    setValue(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 입력 필드 값 변경 처리 함수
  const handleInputChange = e => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  useEffect(() => {
    const { title, price, content, tag } = value;
    const allFieldsFilled = title && price && content && tag;
    setIsDisabled(allFieldsFilled);
  }, [value]);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   // 새 폼 데이터 인스턴스 생성
  //   const formData = new FormData();
  //   // 각 필드의 값을 지정
  //   formData.append('imgFile', value.imgFile);
  //   formData.append('title', value.title);
  //   formData.append('price', value.price);
  //   formData.append('content', value.content);
  //   formData.append('tag', value.tag);
  // };

  console.log(isDisabled);

  return (
    // <form className="AdditemForm" onSubmit={handleSubmit}>
    <form className="AdditemForm">
      <div className="AdditemForm-submit-wrap">
        <h2 className="AdditemForm-main-tit">상품 등록하기</h2>
        <button className={'submit-button' + (isDisabled ? ' active' : '')} disabled={!isDisabled}>
          등록
        </button>
      </div>
      <FileInput name="imgFile" value={value.imgFile} onChange={handleChange} />
      <div className="AdditemForm-input-wrap">
        <label htmlFor="title" className="AdditemForm-sub-tit">
          상품명
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={value.title}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="content" className="AdditemForm-sub-tit">
          상품 소개
        </label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={value.content}
          placeholder="상품 소개를 입력해주세요"
          className="AdditemForm-content"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="price" className="AdditemForm-sub-tit">
          판매가격
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={value.price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="tag" className="AdditemForm-sub-tit">
          태그
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={value.tag}
          placeholder="태그를 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default AdditemForm;
