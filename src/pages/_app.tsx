import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import { ThemeProvider } from "styled-components";
import { QueryProvider } from "../context/QueryContext";
import GlobalStyle from "@/styles/GlobalStyle";
import theme from "@/styles/theme";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>판다 마켓</title>
        <meta name="description" content="Next.js로 만든 판다 마켓" />
        <link rel="icon" href="/public/favicon.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <QueryProvider>
          <Component {...pageProps} />
        </QueryProvider>
      </ThemeProvider>
    </>
  );
}
