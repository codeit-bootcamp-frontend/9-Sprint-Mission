import { useEffect, useState } from "react";
import "./Additem.css";

function Additem() {
  let [tag, setTag] = useState("");
  let [tagState, setTagState] = useState(["#티셔츠", "#상의"]);

  let [itemTitle, setItemTitle] = useState("");
  let [itemContent, setItemContent] = useState("");
  let [itemPrice, setItemPrice] = useState("");
  let [isDisabled, setIsDisabled] = useState(true);
  let [isEnabled, setIsEnabled] = useState(false);

  let [newImg, setNewImg] = useState("");
  let [addImg, setAddImg] = useState(false);

  const [preview, setPreview] = useState(null);

  let [errorMessage, setErrorMessage] = useState("");

  // 버튼 활성화
  useEffect(() => {
    if (itemTitle && itemContent && itemPrice) {
      setIsDisabled(false);
      setIsEnabled(true);
    } else {
      setIsDisabled(true);
    }
  }, [itemTitle, itemContent, itemPrice]);

  // 태그 추가
  let handleChange = (e) => {
    setTag(e.target.value);
  };
  let handleKeydown = (e) => {
    if (e.key === "Enter") {
      let copy = [...tagState];
      copy.push("#" + e.target.value);
      setTagState(copy);
    }
  };

  // 이미지 추가
  let fileReader = (e) => {
    let imgFile = e.target.files?.[0];
    if (imgFile) {
      if (preview !== null) {
        return setErrorMessage("한개만쓰셈");
      }
      setPreview(URL.createObjectURL(imgFile));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="additem">상품 등록하기</div>
        <button
          disabled={isDisabled}
          className={`additem-btn ${isEnabled ? "active" : ""}`}
        >
          등록
        </button>
      </div>
      <div className="main">
        <div className="item-img">
          <label htmlFor="itemImg">상품 이미지</label>
          <div className="addimg-box">
            <label htmlFor="addImg" className="imgBox">
              <input
                type="file"
                id="addImg"
                accept="image/*"
                className="fileSelect"
                onChange={fileReader}
              />
              <img src="/ic_plus.png" alt="plusImg"></img>
              <div>이미지 등록</div>
            </label>

            {/* 보더문제 */}
            <label>
              <img src={preview} className="previewImg"></img>
            </label>
          </div>
          <div style={{ display: errorMessage ? "block" : "none" }}>
            {errorMessage}
          </div>
        </div>

        <div className="item-title">
          <label htmlFor="itemName">상품명</label>
          <input
            id="itemName"
            value={itemTitle} // qweqweqweqwe
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
          />
        </div>
        <div className="item-content">
          <label htmlFor="itemContent">상품 소개</label>
          <input
            id="itemContent"
            value={itemContent}
            type="text"
            placeholder="상품소개를 입력해주세요"
            className="input-content"
            onChange={(e) => {
              setItemContent(e.target.value);
            }}
          />
        </div>
        <div className="item-price1">
          <label htmlFor="itemPrice">판매가격</label>
          <input
            id="itemPrice"
            value={itemPrice}
            type="number"
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => {
              setItemPrice(e.target.value);
            }}
          />
        </div>
        <div className="item-tag">
          <p>태그</p>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            onChange={handleChange}
            onKeyDown={handleKeydown}
          />
          <div className="tag-box">
            {tagState.map((item) => {
              return <p className="add-tag"> {item} </p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additem;
