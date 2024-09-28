import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import testImage from "@/public/panda_logo.png";
import medalImage from "@/public/ic_medal.png";

interface Props {
  title?: string;
  author?: string;
  likes?: number;
  date?: string; // 부모 컴포넌트에서 date 포맷 변경해서 내려주기
  imageSrc?: string;
}

export default function BestProductCard({
  title,
  author,
  likes,
  date,
  imageSrc,
}: Props) {
  return (
    <div className='w-96 px-4 flex flex-col gap-3 bg-gray-50 pb-3 rounded-lg'>
      <div className='flex items-center gap-1 w-fit bg-primary-100 rounded-b-2xl px-6 py-0.5'>
        <Image src={medalImage} alt='메달 이미지' className='w-4 h-4' />
        <span className='text-white font-semibold text-base'>Best</span>
      </div>
      <div className='w-auto'>
        <div className='flex items-center gap-10'>
          <h1 className='text-xl font-semibold w-80'>
            맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
          </h1>
          <div className='w-16 p-2 border border-gray-200 rounded-lg'>
            <Image
              src={testImage}
              alt='게시글_이미지'
              className='object-cover'
            />
          </div>
        </div>
      </div>
      <div className='flex justify-between text-gray-600'>
        <div className='flex items-center gap-1'>
          <span>총명한 판다</span>
          <CiHeart />
          <span>9999+</span>
        </div>
        <span>2024.04.06</span>
      </div>
    </div>
  );
}
