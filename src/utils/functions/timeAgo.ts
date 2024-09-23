const timeAgo = (timestamp: string | number | Date): string => {
    let timeAgoString = "";
    console.log(typeof timestamp);
    if (timestamp) {
        const date: Date = new Date(timestamp);
        const now: Date = new Date();
        const differenceInMilliseconds: number = now.getTime() - date.getTime();

        const minutes: number = Math.floor(
            differenceInMilliseconds / 1000 / 60
        );
        const hours: number = Math.floor(minutes / 60);
        const days: number = Math.floor(hours / 24);
        const months: number = Math.floor(days / 30);

        if (months > 0) {
            timeAgoString = `${months}개월 전`;
        } else if (days > 0) {
            timeAgoString = `${days}일 전`;
        } else if (hours > 0) {
            timeAgoString = `${hours}시간 전`;
        } else if (minutes > 0) {
            timeAgoString = `${minutes}분 전`;
        } else {
            timeAgoString = "방금 전";
        }
    }

    return timeAgoString;
};

export default timeAgo;
