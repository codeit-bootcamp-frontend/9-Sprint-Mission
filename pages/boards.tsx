import BestProductCard from "@/components/BestProductCard";
import Layout from "@/components/Layout";

export default function Boards() {
  return (
    <Layout>
      <h2 className='mt-6 font-bold text-xl'>베스트 게시글</h2>
      <div className='flex gap-6 mt-6'>
        <BestProductCard />
        <BestProductCard />
        <BestProductCard />
      </div>
      <div className='flex'>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </div>
      <section></section>
    </Layout>
  );
}
