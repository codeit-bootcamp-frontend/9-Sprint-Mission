import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Head from "next/head";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/assets/panda-face.svg" />
      </Head>
      <div className={pretendard.className}>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}
