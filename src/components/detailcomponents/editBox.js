import { useState } from "react";
import "../../pages/detail/DetailPage.css";

function EditBox({ setActiveComment }) {
  let [editBox, setEditBox] = useState(false);

  //   function handleClickEdit () {
  //     if (editBox === true) {
  //         return(

  //                 <div className="editBox">
  //                   <div
  //                     onClick={() => {
  //                       setActiveComment(false);
  //                     }}
  //                   >
  //                     수정하기
  //                   </div>
  //                   <div>삭제하기</div>
  //                 </div>

  //         )
  //     } else {
  //         return ()
  //     }
  //   }

  return (
    <>
      <div className="commentBox__editBox">
        <div className="commentBox__edit">
          <img
            src="/edit.png"
            alt="더보기이미지"
            onClick={() => {
              setEditBox(!editBox);
            }}
          />
        </div>
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

export default EditBox;
