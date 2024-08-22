import { useState } from "react";
import "./AddItem.css";
import AddItemInput from "./AddItemInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddItem = () => {
  const navigate = useNavigate();

  const [src, setSrc] = useState(null);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    images: null,
    name: "",
    description: "",
    price: "",
    tags: [],
  });

  // 등록버튼 활성화 여부
  const isReady = values.name && values.description && values.price && values.tags.length !== 0;
  
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

      // value를 초기화해야 취소 후 다시 같은 이미지를 업로드해도 미리보기가 잘 뜬다. 
      e.target.value = "";

      // 미리보기 생성
      const imageRead = new FileReader();

      imageRead.onloadend = () => {
        setSrc(imageRead.result);
      };
      imageRead.readAsDataURL(file);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://panda-market-api.vercel.app/products/", {
        values
      });

      if (response.status === 200) {
        const data = response.data;
        navigate(`/items/${data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("addItem onSubmit에서 오류 발생.", error);
      }
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
        <AddItemInput values={values} setValues={setValues} />
      </form>
    </div>
  );
};

export default AddItem;
