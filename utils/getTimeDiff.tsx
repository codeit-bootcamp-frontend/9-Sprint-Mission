import { getDate } from "./getDate";

export const getTimeDiff = (isoDate: string): string | number => {
  const date = getDate(isoDate);
  const timeFromIsoDate = new Date(isoDate).getTime();
  const time = new Date().getTime();
  const timeDiff = time - timeFromIsoDate;
  if (timeDiff <= 24) {
    return timeDiff;
  } else {
    return date;
  }
};
