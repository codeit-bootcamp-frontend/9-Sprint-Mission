import { useParams } from "react-router-dom";
import { ItemEach } from "./ItemEach";
import { Header } from "./Header";

export function ItemPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <main>
        <ItemEach id={id} />
      </main>
    </>
  );
}
