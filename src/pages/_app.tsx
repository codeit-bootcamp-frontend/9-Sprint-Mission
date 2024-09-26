import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
