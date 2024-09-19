// dateFormatter.ts
export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  // 한국 시간으로 변환
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  // 'YYYY.MM.DD' 형식으로 포맷
  const formattedDate = date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "")
    .split(" ")
    .join(".");

  return formattedDate;
};

export const formatRelativeTime = (updatedAt: string) => {
  const now = new Date();
  const utc = new Date(updatedAt);

  // 한국 시간 (UTC+9)으로 변환
  const KST_OFFSET = 9 * 60; // 9시간을 분 단위로 변환
  const local = new Date(utc.getTime() + KST_OFFSET * 60000);

  const milliSeconds = now.getTime() - local.getTime();
  const seconds = milliSeconds / 1000;

  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};
