import Link from "next/link";
import BestPostList from "./BestPostList";
import PostSearch from "./PostSearch";

const BestPost = () => {
  return (
    <>
      <h2 className="text-lg font-bold">베스트 게시글</h2>
      <div className="md:grid md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 lg:gap-x-6">
        <BestPostList />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">게시글</h2>
          <Link
            href="/addboard"
            className="bg-panda-theme text-white px-6 py-3 font-semibold rounded-lg"
          >
            글쓰기
          </Link>
        </div>
        <PostSearch />
      </div>
    </>
  );
};

export default BestPost;
