import axios from "axios";
import "./CommentEdit.css";
import toast from "react-hot-toast";

interface IProps {
  setOpenCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  setEditCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  commentId: number;
}

const CommentEdit: React.FC<IProps> = ({ setEditCommentId, setOpenCommentId, commentId }) => {
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
          toast.success("댓글이 삭제되었습니다.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("상세페이지 CommentEdit onDelete DELETE 요청에서 API 오류 발생", error);
          toast.error(error.response?.data.message);
        } else {
          console.error("상세페이지 CommentEdit onDelete DELETE 요청에서 알 수 없는 오류 발생", error);
          toast.error("오류가 발생하여 삭제되지 않았습니다.");
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
