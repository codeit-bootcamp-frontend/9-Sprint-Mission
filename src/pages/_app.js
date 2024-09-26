import Header from "../components/Header";
import "@/src/styles/reset.scss";
import "@/src/styles/common.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
