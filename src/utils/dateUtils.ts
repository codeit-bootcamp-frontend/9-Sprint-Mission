export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString('ko-KR', options)
    .replace(/\./g, '. ');

  // 마지막 문자가 공백이거나 점인 경우 제거
  return formattedDate.trim().replace(/\s*\.$/, '');
};
