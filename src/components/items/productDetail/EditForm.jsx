import { useState } from "react";
import "./EditForm.css";
import axios from "axios";

const EditForm = ({ content, commentId, setEditCommentId }) => {
  const [newContent, setNewContent] = useState("");
  
  const onCancel = () => {
    setEditCommentId(null);
  };
  
  const onChangeContent = (e) => {
    setNewContent(e.target.value);
  };

  const onEdit = async () => {
    try {
      const response = await axios.patch(`https://panda-market-api.vercel.app/comments/${commentId}`, {
        content: newContent
      });

      if (response.status === 200) {
        console.log("댓글 수정완료");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("상세페이지 EditForm onEdit PATCH 요청에서 오류 발생", error);
      }
    }
  };

  return (
    <form className="editForm" onSubmit={onEdit}>
      <textarea id="editComment" defaultValue={content} rows={5} onChange={onChangeContent} className="editItemContents" />
      <div className="editBtnBox">
        <button className="cancelBtn" onClick={onCancel}>취소</button>
        <button type="submit" className="editBtn" disabled={!newContent}>수정 완료</button>
      </div>
    </form>
  );
};

export default EditForm;
