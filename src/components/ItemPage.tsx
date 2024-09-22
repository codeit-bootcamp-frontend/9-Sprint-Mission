import { useParams } from "react-router-dom";
import { ItemEach } from "./ItemEach";
import { Header } from "./Header";
import { ReplySubmit } from "./ReplySubmit";
import { ReplyList } from "./ReplyList";
import { BackBtn } from "./BackBtn";

type Params = {
  id?: string;
};

export function ItemPage() {
  const { id } = useParams<Params>();

  if (id === undefined) {
    return <div>Error: ID is not available</div>;
  }

  return (
    <>
      <Header />
      <main>
        <ItemEach id={id} />
        <ReplySubmit id={id} />
        <ReplyList id={id} limit={10} cursor={10} />
        <BackBtn />
      </main>
    </>
  );
}
