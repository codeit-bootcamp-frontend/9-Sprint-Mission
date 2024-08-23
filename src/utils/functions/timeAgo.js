// 예전에 사이드 프로젝트 하면서 만들었던 코드 그냥 가져왔습니다.
const timeAgo = (timestamp) => {
    let timeAgoString = "";

    if (timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const differenceInMilliseconds = now - date;

        const minutes = Math.floor(differenceInMilliseconds / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

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
