import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Loading from "@/components/UI/Loading";
import "../styles/globals.scss";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const start = () => {
      // 시작 시 타이머 설정
      timer = setTimeout(() => {
        setLoading(true);
      }, 300); // 0.3초 후에 로딩 상태를 설정
    };

    const end = () => {
      clearTimeout(timer);
      setLoading(false);
    };

    // route가 변경되기 시작할 때 발생하는 이벤트
    Router.events.on("routeChangeStart", start);
    // route 변경이 완료되었을 때 발생하는 이벤트
    Router.events.on("routeChangeComplete", end);
    // route 변경이 취소되거나 에러가 발생했을 때 이벤트
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <>
          <AuthProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </AuthProvider>
        </>
      )}
    </>
  );
}
