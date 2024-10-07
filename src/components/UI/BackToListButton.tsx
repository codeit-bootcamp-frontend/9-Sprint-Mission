import Link from "next/link";
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const BackIcon = "/images/icons/ic_back.png";

const BackToListButton = ({ path }: { path: string }) => {
  return (
    <div className="container mx-auto mb-6 flex justify-center items-center">
      <Link
        href={path}
        className="flex items-center justify-center gap-2 text-lg font-semibold bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600"
      >
        목록으로 돌아가기
        <Image src={BackIcon} alt="목록으로 돌아가기" width={24} height={24} />
      </Link>
    </div>
  );
};

export default BackToListButton;
