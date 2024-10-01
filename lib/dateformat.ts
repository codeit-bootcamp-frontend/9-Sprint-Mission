function dateFormat(date: string) {
  const d = new Date(date);

  const year = d.getFullYear(); // 년
  const month = (d.getMonth() + 1).toString().padStart(2, "0"); // 달
  const day = d.getDate().toString().padStart(2, "0"); // 일

  const yyyymmdd = `${year}.${month}.${day}`;

  return yyyymmdd;
}

export default dateFormat;
