import Head from "next/head";
import { Inter } from "next/font/google";
import CommunityList from "./Community/CommunityList";
import axios from "@/src/api/axios";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Community } from "@/src/types/types";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = (async () => {
  const res = await axios.get("/articles");
  const articles: Community = await res.data.list;

  return { props: { articles } };
}) satisfies GetServerSideProps<{ articles: Community }>;

export default function Home({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta name="description" content="판다마켓" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommunityList articles={articles} />
    </>
  );
}
