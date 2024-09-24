import Boards from "./boards";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <div className="container">
        <Boards />
      </div>
    </>
  );
}
