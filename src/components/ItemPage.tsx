import { useParams } from "react-router-dom";
import { ItemEach } from "./ItemEach";
import { Header } from "./Header";
import { ReplySubmit } from "./ReplySubmit";
import { ReplyList } from "./ReplyList";
import { BackBtn } from "./BackBtn";

export function ItemPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <main>
        <ItemEach id={id} />
        <ReplySubmit id={id} />
        <ReplyList id={id} limit="10" cursor="10" />
        <BackBtn />
      </main>
    </>
  );
}
