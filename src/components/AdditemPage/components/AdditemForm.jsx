import { useEffect, useState } from 'react';
import FileInput from './FileInput';
import Tag from './Tag';

const INITIAL_VALUES = {
  images: null,
  name: '',
  price: 0,
  description: '',
  tags: [],
};

const AdditemForm = ({ initialValues = INITIAL_VALUES }) => {
  const [value, setValue] = useState(initialValues);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tagValue, setTagValue] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const form = e.target;
    // 새 폼 데이터 인스턴스 생성
    const formData = new FormData(form);
    // 각 필드의 값을 지정(key, value)
    formData.append('images', value.images);
    formData.append('name', value.name);
    formData.append('price', value.price);
    formData.append('description', value.description);
    formData.append('tags', JSON.stringify(value.tags));

    // 로그 출력으로 FormData 내용 확인
    const logFormData = formData => {
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    };
    logFormData(formData);

    // await postPandaMarket(formData);
    // 성공적으로 추가된 후 초기화
    setValue(INITIAL_VALUES);
  };

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

  // 등록 활성화 버튼
  useEffect(() => {
    const { name, price, description, tags } = value;
    const allFieldsFilled = name && price > 0 && description && tags[0];
    if (allFieldsFilled) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [value]);

  // 태그 추가 함수
  const addTag = tag => {
    // 빈칸 X, 중복 X
    if (tag && tag.trim() !== '' && !value.tags.includes(tag)) {
      setValue(prevValue => ({
        ...prevValue,
        tags: [...prevValue.tags, tag],
      }));
      setTagValue('');
    }
  };

  const handleTagChange = e => {
    setTagValue(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagValue);
    }
  };

  const handleTagDelete = tagDelete => {
    setValue(prevValue => ({
      ...prevValue,
      tags: prevValue.tags.filter(tag => tag !== tagDelete),
    }));
    console.log('value 값', value);
  };

  return (
    <form className="AdditemForm" onSubmit={handleSubmit}>
      <div className="AdditemForm-submit-wrap">
        <h2 className="AdditemForm-main-tit">상품 등록하기</h2>
        <button type="submit" className={'submit-button' + (isDisabled ? ' active' : '')} disabled={!isDisabled}>
          등록
        </button>
      </div>
      <FileInput name="images" value={value.images} onChange={handleChange} />
      <div className="AdditemForm-input-wrap">
        <label htmlFor="name" className="AdditemForm-sub-tit">
          상품명
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={value.name}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="description" className="AdditemForm-sub-tit">
          상품 소개
        </label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={value.description}
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
        <label htmlFor="tags" className="AdditemForm-sub-tit">
          태그
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tagValue || ''}
          placeholder="태그를 입력해주세요"
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
        />
        <Tag tags={value.tags} handleTagDelete={handleTagDelete} />
      </div>
    </form>
  );
};

export default AdditemForm;
