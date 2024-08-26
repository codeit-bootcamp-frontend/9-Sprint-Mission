import { useState } from "react";
import CommentEdit from "./CommentEdit";

function Comment({ item }) {
  let [editBox, setEditBox] = useState(false);
  let [isEdit, setIsEdit] = useState(false);

  if (isEdit) return <CommentEdit setIsEdit={setIsEdit} />;
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
        {editBox === true && (
          <div className="editBox">
            <div
              onClick={() => {
                setIsEdit(true);
              }}
            >
              수정하기
            </div>
            <div>삭제하기</div>
          </div>
        )}
      </div>
    </>
  );
}

export default Comment;
