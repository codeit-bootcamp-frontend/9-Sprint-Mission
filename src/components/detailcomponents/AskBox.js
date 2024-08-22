import { useState } from "react";

function AskBox() {
  let [activeBtn, setActiveBtn] = useState(false);
  return (
    <div className="main__AskBox">
      <div className="askBoxLabel">
        <label htmlFor="ask" className="askBoxTitle">
          문의하기
        </label>
      </div>
      <textarea
        type="text"
        id="ask"
        className="askBoxTextarea"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        onChange={(e) => {
          e.target.value === "" ? setActiveBtn(false) : setActiveBtn(true);
        }}
      ></textarea>
      <div className="askBoxButton">
        <button
          className={activeBtn === false ? "askBoxButton__btn" : "changeColor"}
        >
          등록
        </button>
      </div>
    </div>
  );
}
export default AskBox;
