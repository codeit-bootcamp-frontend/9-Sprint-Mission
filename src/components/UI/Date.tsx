import styles from "./Date.module.scss";
import { formatUpdatedAt } from "@/utils/dateUtils";

interface Props {
  date: Date;
}

const Date = ({ date }: Props) => {
  const formattedUpdatedAt = formatUpdatedAt(date);

  return <p className={styles.date}>{formattedUpdatedAt}</p>;
};

export default Date;
