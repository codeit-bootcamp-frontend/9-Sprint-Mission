import "./Comment.css";
import CommentItem from "./CommentItem";
import nocommentImg from "../../assets/nocomment.svg";
import { getComment } from "../../api";
import { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/profile.svg";

function Comment({ id }) {
  const idRef = useRef(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      let data;
      try {
        data = await getComment({ id });
      } catch (error) {
        console.error(error);
      }
      setComments(data.list);
    };

    fetchComment();
  }, [id]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCommentId !== null) {
      setComments((prevComments) =>
        prevComments.map((item) =>
          item.id === editingCommentId
            ? { ...item, content: comment, updatedAt: new Date().toISOString() }
            : item
        )
      );
      setEditingCommentId(null);
    } else {
      const newComment = {
        id: idRef.current++,
        content: comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        writer: {
          id: 999,
          nickname: "mungyun",
          image: profileImg,
        },
      };

      setComments((prevComments) => [newComment, ...prevComments]);
    }

    setComment("");
  };

  const handleEdit = (id, content) => {
    setEditingCommentId(id);
    setComment(content);
  };

  const onDelete = (id) => {
    setComments(comments.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="question">
        <h4>문의하기</h4>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="question-box"
            value={comment}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <div className="question-button-section">
            <button
              className="question-submit-button"
              type="submit"
              disabled={comment === ""}
            >
              {editingCommentId !== null ? "수정 완료" : "등록"}
            </button>
          </div>
        </form>
      </div>
      {comments?.length > 0 ? (
        <ul className="comments">
          {comments.map((item) => (
            <li key={item.id}>
              <CommentItem
                item={item}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="nocomment-section">
          <img src={nocommentImg} alt="댓글 없음" width="196" height="230" />
        </div>
      )}
    </>
  );
}

export default Comment;
