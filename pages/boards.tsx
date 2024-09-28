import BestPostList from "@/components/BestPostList";
import TotalPostList from "@/components/TotalPostList";
import styles from "@/styles/board.module.css";

export default function Boards() {
  return (
    <>
      <div className={styles["post-container"]}>
        <BestPostList />
        <TotalPostList />
      </div>
    </>
  );
}
