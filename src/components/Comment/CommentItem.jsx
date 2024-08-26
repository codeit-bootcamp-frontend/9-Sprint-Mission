import "./CommentItem.css";
import dropdownImg from "../../assets/dropdown.svg";
import Profile from "../Profile/Profile";
import { useState, useEffect } from "react";

function CommentItem({ item, onDelete }) {
  const [timeAgo, setTimeAgo] = useState("");
  const [view, setView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);

  useEffect(() => {
    const currentTime = new Date();
    const createdTime = new Date(item.createdAt);
    const timeDiff = currentTime - createdTime;
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

    if (hoursDiff < 24) {
      setTimeAgo(`${hoursDiff}시간 전`);
    } else {
      const daysDiff = Math.floor(hoursDiff / 24);
      setTimeAgo(`${daysDiff}일 전`);
    }
  }, [item.createdAt]);

  const handleUpdateClick = () => {
    setIsEditing(true);
    setView(false);
  };

  const handleSaveClick = () => {
    item.content = editedContent;
    item.updatedAt = new Date().toISOString();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(item.content);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
    setView(false);
  };

  return (
    <div className="CommentItem">
      {isEditing ? (
        <div className="CommentItem-edit">
          <input
            className="CommentItem-editbox"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="CommentItem-edit-buttons">
            <button
              className="CommentItem-delete-button"
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button
              className="CommentItem-edit-button"
              onClick={handleSaveClick}
            >
              수정완료
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="CommentItem-top">
            <p className="CommentItem-content">{item.content}</p>
            {item.writer.id === 999 && (
              <div className="dropdown" onClick={() => setView(!view)}>
                <img src={dropdownImg} alt="드롭다운" width="24" height="24" />
                {view && (
                  <div className="Dropdown-section">
                    <span
                      onClick={handleUpdateClick}
                      className="Dropdown-update"
                    >
                      수정하기
                    </span>
                    <span
                      onClick={handleDeleteClick}
                      className="Dropdown-delete"
                    >
                      삭제하기
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <Profile
            src={item.writer.image}
            nickname={item.writer.nickname}
            timeAgo={timeAgo}
          />
        </>
      )}
    </div>
  );
}

export default CommentItem;
