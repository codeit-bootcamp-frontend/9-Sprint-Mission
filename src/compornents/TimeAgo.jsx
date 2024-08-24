import React from "react";

// TimeAgo 컴포넌트 정의
function TimeAgo({ timestamp }) {
  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMs = now - commentDate; // 시간 차이 계산 (밀리초)
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // 시간 단위로 변환

    if (diffInHours < 1) {
      return `${Math.floor(diffInMs / (1000 * 60))}분 전`; // 1시간 미만일 경우 분 단위로 표시
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`; // 24시간 미만일 경우 시간 단위로 표시
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`; // 24시간 이상일 경우 일 단위로 표시
    }
  };

  return <span>{formatTimeAgo(timestamp)}</span>;
}

export default TimeAgo;
