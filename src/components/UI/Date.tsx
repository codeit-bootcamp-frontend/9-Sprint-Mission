import styles from "./Date.module.scss";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { format } from "date-fns";

export const Date = ({ date }: { date: Date }) => {
  const formattedUpdatedAt = formatUpdatedAt(date);

  return <p className={styles.date}>{formattedUpdatedAt}</p>;
};

export const FormatDate = ({ date }: { date: Date | string }) => {
  const formattedCreatedAt = format(date, "yyyy. MM. dd");

  return <p className={styles.date}>{formattedCreatedAt}</p>;
};
