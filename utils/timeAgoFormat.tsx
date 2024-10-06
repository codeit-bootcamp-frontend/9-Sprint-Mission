export const timeAgoFormat = (createdAt: Date | string) => {
  const currentTime = new Date();
  const createdTime =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const timeDiff = currentTime.getTime() - createdTime.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else {
    const daysDiff = Math.floor(hoursDiff / 24);
    return `${daysDiff}일 전`;
  }
};
