function CommentEdit({ setActiveComment }) {
  return (
    <>
      <input className="commentBox__editMode"></input>
      <div className="commentBox__editModeBtn">
        <button
          className="commentBox__editModeBtn--cancel"
          onClick={() => {
            setActiveComment(true);
          }}
        >
          취소
        </button>
        <button className="commentBox__editModeBtn--complete">수정완료</button>
      </div>
    </>
  );
}

export default CommentEdit;
