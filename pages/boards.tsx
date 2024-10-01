import BestBoard from "@/components/BestBoard";
import Board from "@/components/Board";
import { SortProvider } from "@/context/SortContext";
import styles from "@/styles/Boards.module.css";

export default function Boards() {
  return (
    <main className={styles.container}>
      <BestBoard />
      <SortProvider>
        <Board />
      </SortProvider>
    </main>
  );
}
