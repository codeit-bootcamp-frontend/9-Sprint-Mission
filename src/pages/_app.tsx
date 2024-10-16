import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/Authcontext";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import Header from "@/components/layout/Header";
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
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
