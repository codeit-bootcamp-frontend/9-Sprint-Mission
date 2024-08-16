import { useEffect, useState } from "react";
import CheckInputs from "../../utils/CheckInputs";
import "./AddItem.css";

const AddItem = () => {
  const [src, setSrc] = useState(null);
  const [tagId, setTagId] = useState(0);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [isReady, setReady] = useState(false);
  const [values, setValues] = useState({
    images: null,
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  // 등록버튼 활성화 여부
  useEffect(() => {
    if (values.name && values.description && values.price && values.tags.length !== 0) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [values.name, values.description, values.price, values.tags]);

  // tag id 증가 함수
  const generateTagId = () => {
    setTagId((prevId) => prevId + 1);
    return tagId;
  };

  // 이미지 파일 변경함수
  const onChangeFile = (e) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      const file = files[0];

      if (values.images) {
        setError("*이미지 등록은 최대 1개까지 가능합니다.");
        return;
      }
      setError("");
      setValues((prevValues) => ({
        ...prevValues,
        images: file,
      }));

      // 미리보기 생성
      const imageRead = new FileReader();

      imageRead.onloadend = () => {
        setSrc(imageRead.result);
      };
      imageRead.readAsDataURL(file);
    } 
  };

  // 상품명, 설명, 가격 변경 및 검증함수
  const onChangeContents = (e) => {
    const {
      target: { name, value },
    } = e;

    setValues((prevValues) => {
      const newValues = { ...prevValues };

      if (name === "itemName") {
        newValues.name = value;
      } else if (name === "itemDescription") {
        newValues.description = value;
      } else if (name === "itemPrice") {
        newValues.price = value;
      }

      return newValues;
    });
  };

  // 입력한 태그명 변경함수
  const onChangeTag = (e) => {
    const newTag = e.target.value;
    setTagInput(newTag);
  };

  // 태그 입력하여 엔터눌렀을 때 실행함수
  const onTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTag = {
        id: generateTagId(),
        name: tagInput.trim(),
      };

      const newValues = {
        ...values,
        tags: [...values.tags, newTag],
      };

      setValues(newValues);
      setTagInput("");
    }
  };

  // 업로드 이미지 삭제 함수
  const onDeleteImg = () => {
    setSrc(null);
    setValues((prevValues) => ({
      ...prevValues,
      images: null,
    }));
  };

  // 추가한 태그 삭제함수
  const onDeleteTag = (clickTag) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((tag) => tag.id !== clickTag),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const isValid = CheckInputs({ params: values });

      if (!isValid) {
        console.log("유효성 검사 통과 못함");
        return;
      }

      // 스프린트 미션7에서 api 연결 추가
    } catch (error) {
      console.error("addItem onSubmit에서 오류 발생.", error);
    } finally {
      setError("");
      setValues({
        images: null,
        name: "",
        description: "",
        price: "",
        tags: [],
      });
    }
  };

  return (
    <div className="container">
      <form className="addItemForm" onSubmit={onSubmit}>
        <div className="addItemHeader">
          <h1 className="headerTitle">상품 등록하기</h1>
          <button type="submit" className="headerBtn" disabled={!isReady}>
            등록
          </button>
        </div>
        <div className="addItemImgBox">
          <h2 className="imgTitle">상품 이미지</h2>
          <div className="imgBox">
            <label htmlFor="itemImg" className="itemImg">
              <img src="/plus.png" alt="파일 올리기" />
              <span>이미지 등록</span>
            </label>
            <input type="file" id="itemImg" onChange={onChangeFile} accept="image/*" />
            {values.images && (
              <div className="previewBox">
                <button className="deleteBtn" onClick={onDeleteImg}>
                  <img src="/delete.png" alt="삭제" />
                </button>
                <img src={src} alt="사진 미리보기" className="previewImg" />
              </div>
            )}
          </div>
          {error !== "" && <p className="errorMsg">{error}</p>}
        </div>
        <div className="addItemContentsBox">
          <label htmlFor="itemName" className="contentsTitle">
            상품명
          </label>
          <input
            type="text"
            onChange={onChangeContents}
            value={values.name}
            id="itemName"
            name="itemName"
            className="contents"
            placeholder="상품명을 입력해주세요."
            required
          />
        </div>
        <div className="addItemContentsBox">
          <label htmlFor="itemDescription" className="contentsTitle">
            상품 소개
          </label>
          <textarea
            id="itemDescription"
            onChange={onChangeContents}
            value={values.description}
            name="itemDescription"
            rows={10}
            className="itemDescription"
            placeholder="상품 소개를 입력해주세요."
            required
          />
        </div>
        <div className="addItemContentsBox">
          <label htmlFor="itemPrice" className="contentsTitle">
            판매 가격
          </label>
          <input
            type="number"
            id="itemPrice"
            onChange={onChangeContents}
            value={values.price.toLocaleString("ko-KR")}
            name="itemPrice"
            className="contents"
            placeholder="판매 가격을 입력해주세요."
            required
          />
        </div>
        <div className="addItemContentsBox">
          <label htmlFor="itemTag" className="contentsTitle">
            태그
          </label>
          <input
            type="text"
            id="itemTag"
            onChange={onChangeTag}
            onKeyDown={onTagKeyDown}
            value={tagInput}
            name="itemTag"
            className="contents"
            placeholder="태그를 입력해주세요."
          />
          <ul className="tagList">
            {values.tags.map((tag) => (
              <li key={tag.id} className="tagListItem">
                {tag.name}
                <button className="tagDeleteBtn" onClick={() => onDeleteTag(tag.id)}>
                  <img src="/delete.png" alt="삭제" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
