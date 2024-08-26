import axios from "axios";
import "./CommentEdit.css";

const CommentEdit = ({ setEditCommentId, setOpenCommentId, commentId }) => {
  const onEdit = () => {
    setEditCommentId((prevId) => prevId === commentId ? null : commentId);
    setOpenCommentId(null);
  };

  // 댓글 삭제 요청
  const onDelete = async () => {
    const isConfirm = window.confirm("정말 댓글을 삭제하시겠습니까?");

    if (isConfirm) {
      try {
        const response = await axios.delete(
          `https://panda-market-api.vercel.app/comments/${commentId}`
        );

        if (response.status === 200) {
          console.log("댓글 삭제됨");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("상세페이지 CommentEdit onDelete DELETE 요청에서 오류 발생", error);
        }
      } finally {
        setOpenCommentId(null);
      }
    }
  };

  return (
    <div className="editMenuBox">
      <button className="menuBtn" onClick={onEdit}>
        수정하기
      </button>
      <button className="menuBtn" onClick={onDelete}>
        삭제하기
      </button>
    </div>
  );
};

export default CommentEdit;
