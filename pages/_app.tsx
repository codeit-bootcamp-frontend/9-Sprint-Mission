import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbar =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      {!hideNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
