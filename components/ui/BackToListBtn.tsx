import Image from "next/image";
import { useRouter } from "next/navigation";

const BackToListBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center space-x-2 px-16 py-3 bg-panda-theme hover:bg-panda-theme-hover rounded-full w-fit m-auto transition-all"
    >
      <p className="text-panda-gray100 font-semibold text-lg">목록으로 돌아가기</p>
      <Image src="/icons/back.png" alt="이전페이지" width={24} height={24} />
    </button>
  );
};

export default BackToListBtn;
