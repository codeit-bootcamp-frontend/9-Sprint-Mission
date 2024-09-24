import Header from "@/components/Header";
import "@/styles/reset.scss";
import "@/styles/common.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
