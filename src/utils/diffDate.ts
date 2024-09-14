export function getHoursDiff(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMS = now - date;
  const diffHr = Math.floor(diffMS / (1000 * 60 * 60));
  return diffHr;
}
