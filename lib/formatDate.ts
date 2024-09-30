export default function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("ko-KR");
}
