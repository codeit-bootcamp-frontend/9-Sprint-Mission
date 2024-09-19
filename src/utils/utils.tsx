export const formatCommentsTime = (commentsDate: string): string => {
  const date = new Date(commentsDate);

  if (isNaN(date.getTime())) {
    return "유효하지 않은 날짜";
  }
  const currentTime = new Date();

  const diffMilliseconds = currentTime.getTime() - date.getTime();  // 현재와 코멘트 업데이트날짜와의 차이 (밀리초)
  const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));  // 위 차이를 시간으로 변환

  if (diffHours < 1) {
    return "방금 전";
  } else {
    return `${diffHours}시간 전`;
  }
};