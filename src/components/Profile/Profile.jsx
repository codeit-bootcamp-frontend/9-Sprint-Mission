import "./Profile.css";

function Profile({ src, nickname, createdAt, timeAgo }) {
  return (
    <div className="Profile-bottom">
      <img
        className="Profile-image"
        src={src}
        alt="프로필"
        width="32"
        height="32"
      />
      <div className="Profile-info">
        <span className="Profile-nickname">{nickname}</span>
        {!createdAt ? (
          <p className="Profile-timeage">{timeAgo}</p>
        ) : (
          <p className="Profile-timeage">{new Date().toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
