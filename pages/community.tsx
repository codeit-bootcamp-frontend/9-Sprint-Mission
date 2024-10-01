import BestArticleCard from "@/components/BestArticleCard";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import axios from "@/lib/axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const dropData = [
  { id: "recent", name: "최신순" },
  { id: "like", name: "좋아요순" },
];

interface Writer {
  id: number;
  nickname: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export default function Community() {
  const [order, setOrder] = useState("recent");
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleSelect = (id: string) => {
    if (id === "recent") {
      setOrder("recent"); // 최신순 선택하면 true
    } else if (id === "like") {
      setOrder("like"); // 좋아요 순 선택하면 false
    }
  };

  const getArticles = async (order: string) => {
    const res = await axios.get(`/articles?page=1&pageSize=5&orderBy=${order}`);
    const articles = res.data.list ?? [];
    setArticles(articles);
  };

  const getBestArticles = async () => {
    const res = await axios.get(`/articles?page=1&pageSize=3&orderBy=like`);
    const articles = res.data.list ?? [];
    setBestArticles(articles);
  };

  useEffect(() => {
    getArticles(order);
  }, [order]);

  useEffect(() => {
    getBestArticles();
  }, []);

  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
        <link rel='icon' href='/panda_logo.png' />
      </Head>
      <Layout>
        <h2 className='mt-6 font-bold text-xl'>베스트 게시글</h2>
        <div className='flex justify-between mt-6'>
          {bestArticles.map((article) => (
            <BestArticleCard
              key={article.id}
              title={article.title}
              author={article.writer.nickname}
              date={article.createdAt}
              image={article.image}
              likes={article.likeCount}
            />
          ))}
        </div>
        <div className='flex mt-6 justify-between items-center'>
          <h2 className='font-bold text-xl'>게시글</h2>
          <button className='bg-primary-100 px-6 py-3 text-white rounded-md'>
            글쓰기
          </button>
        </div>
        <section className='mt-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 w-full bg-gray-50 py-2 px-5 rounded-xl mr-6'>
              <IoIosSearch className='text-gray-400' />
              <input
                type='text'
                placeholder='검색할 상품을 입력해주세요.'
                className='bg-gray-50 w-full'
              />
            </div>
            <Dropdown
              order={order}
              title={order === "recent" ? "최신순" : "좋아요순"}
              dropData={dropData}
              onClick={handleSelect}
            />
          </div>
          <div className='flex flex-col justify-center gap-5 mt-6'>
            {articles.map((article) => (
              <Post
                key={article.id}
                author={article.writer.nickname}
                title={article.title}
                date={article.createdAt}
                likeCount={article.likeCount}
                image={article.image}
              />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
