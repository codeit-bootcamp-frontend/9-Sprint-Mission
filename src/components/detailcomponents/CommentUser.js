function CommentUser({ item, dateChange }) {
  return (
    <div className="userBox inCommentBox">
      <div className="userBoxIcon">
        <div className="commentBox__icon">
          <img src={item.writer.image} alt="id-icon" width="100%" />
        </div>
        <div className="userBoxId">
          <div className="userBoxId__id">{item.writer.nickname}</div>
          <div className="userBoxId__date"> {dateChange(item.updatedAt)} </div>
        </div>
      </div>
    </div>
  );
}

export default CommentUser;
