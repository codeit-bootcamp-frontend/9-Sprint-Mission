import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/src/components/Layout/Header";
import "@/src/styles/globals.css";
import Contanier from "../components/Layout/Container";
import Footer from "../components/Layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다 마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
