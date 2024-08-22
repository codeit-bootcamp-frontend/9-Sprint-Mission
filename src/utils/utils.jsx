export const formatCommentsTime = (commentsDate) => {
  const date = new Date(commentsDate);
  const currentTime = new Date();

  const diffMilliseconds = currentTime - date;  // 현재와 코멘트 업데이트날짜와의 차이 (밀리초)
  const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));  // 위 차이를 시간으로 변환

  if (diffHours < 1) {
    return "방금 전";
  } else {
    return `${diffHours}시간 전`;
  }
};