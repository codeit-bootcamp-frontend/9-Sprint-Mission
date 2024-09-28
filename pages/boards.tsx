import BestProductCard from "@/components/BestProductCard";
import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import Head from "next/head";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const dropData = [
  { id: "latest", name: "최신순" },
  { id: "likes", name: "좋아요순" },
];

export default function Boards() {
  const [isLatest, setIsLatest] = useState(true);

  const handleSelect = (id: string) => {
    if (id === "latest") {
      setIsLatest(true); // 최신순 선택하면 true
    } else if (id === "likes") {
      setIsLatest(false); // 좋아요 순 선택하면 false
    }
  };

  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
        <link rel='icon' href='/panda_logo.png' />
      </Head>
      <Layout>
        <h2 className='mt-6 font-bold text-xl'>베스트 게시글</h2>
        <div className='flex justify-between mt-6'>
          <BestProductCard />
          <BestProductCard />
          <BestProductCard />
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
              isLatest={isLatest}
              dropData={dropData}
              onClick={handleSelect}
            />
          </div>
          <div className='flex flex-col justify-center gap-5 mt-6'>
            <Post />
            <Post />
            <Post />
          </div>
        </section>
      </Layout>
    </>
  );
}
