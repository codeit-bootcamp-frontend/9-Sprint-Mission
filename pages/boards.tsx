import BestProductCard from "@/components/BestProductCard";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Boards() {
  return (
    <>
      <Head>
        <title>판다마켓 - 자유게시판</title>
      </Head>
      <Layout>
        <h2 className='mt-6 font-bold text-xl'>베스트 게시글</h2>
        <div className='flex gap-6 mt-6'>
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
        <section>
          <div>
            <input />
            <button>드랍다운 메뉴</button>
          </div>
        </section>
      </Layout>
    </>
  );
}
