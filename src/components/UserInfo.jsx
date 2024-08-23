import styled from "styled-components";

const UserInfoBox = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 8px;

  .user-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .user-nickname {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #4b5563;

    span {
      display: block;
      &:nth-child(2) {
        color: #9ca3af;
      }
    }
  }
`;

const timeDiff = (diifDate) => {
  const start = new Date(diifDate);
  const end = new Date();
  
  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
	if (seconds < 60) return '방금 전';

	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)}분 전`;

	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)}시간 전`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)}일 전`;

	return `${start.toLocaleDateString()}`;

};

function UserInfo({comment}) {
  return (
    <UserInfoBox>
      <img
        src={comment.writer.image}
        alt={comment.content}
        className="user-img"
      />
      <div className="user-nickname">
        <span>{comment.writer.nickname}</span>
        <span>{timeDiff(new Date(comment.createdAt))}</span>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
