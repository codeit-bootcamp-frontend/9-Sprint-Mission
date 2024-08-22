import { useState } from "react";

function Comment({ item, setActiveComment }) {
  let [editBox, setEditBox] = useState(false);
  return (
    <>
      <div className="commentBox__top">
        <div className="commentBox__comment">{item.content}</div>
        <img
          src="/edit.png"
          alt="더보기이미지"
          className="commentBox__img"
          onClick={() => {
            setEditBox(!editBox);
          }}
        />
      </div>
      <div className="commentBox__editBox">
        <div className="commentBox__edit"></div>
        {editBox === true ? (
          <div className="editBox">
            <div
              onClick={() => {
                setActiveComment(false);
              }}
            >
              수정하기
            </div>
            <div>삭제하기</div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Comment;
