import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel='icon' href='/panda_logo.png' />
      </Head>
      <Layout>Home Page</Layout>
    </>
  );
}
