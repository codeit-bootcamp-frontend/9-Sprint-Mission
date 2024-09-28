import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import testImage from "@/public/panda_logo.png";
import profileImage from "@/public/profileImg.png";

interface Props {
  title?: string;
  author?: string;
  likes?: number;
  date?: string; // 부모 컴포넌트에서 date 포맷 변경해서 내려주기
  mainImage?: string;
  profleImage?: string;
}

export default function Post({
  title,
  author,
  likes,
  date,
  mainImage,
  profleImage,
}: Props) {
  return (
    <div className='bg-gray-100'>
      <div className='flex justify-between'>
        <p className=' text-xl font-semibold'>
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </p>
        <div className='w-16 h-16 p-2 border border-gray-200 rounded-lg'>
          <Image src={testImage} alt='게시글_이미지' className='object-cover' />
        </div>
      </div>
      <div className='flex justify-between text-gray-600 text-sm my-5 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
          <Image src={profileImage} alt='프로필_이미지' className='w-6 h-6' />
          <span>총명한 판다</span>
          <span>2024.04.06</span>
        </div>
        <div className='flex items-center gap-1'>
          <CiHeart className='w-6 h-6' />
          <span>9999+</span>
        </div>
      </div>
    </div>
  );
}
