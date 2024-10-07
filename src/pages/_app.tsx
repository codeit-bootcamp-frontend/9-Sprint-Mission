import "@/src/styles/reset.scss";
import "@/src/styles/common.scss";
import Header from "@/src/components/Layout/Header";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
