export function getHoursDiff(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHr = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHr;
}
