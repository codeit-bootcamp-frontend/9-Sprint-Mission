import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import defaultImage from "@/public/panda_logo.png";
import profileImage from "@/public/profileImg.png";
import dateFormat from "@/lib/dateformat";

interface PostProps {
  author: string;
  title: string;
  date: string;
  likeCount: number;
  image: string | null;
}

export default function Post({
  author,
  title,
  date,
  likeCount,
  image,
}: PostProps) {
  return (
    <div className='bg-gray-100 w-full border-b'>
      <div className='flex justify-between'>
        <p className='text-xl font-semibold'>{title}</p>
        <div className='w-16 h-16 p-2 border border-gray-200 rounded-lg'>
          <Image
            src={image || defaultImage}
            alt='게시글_이미지'
            className='object-cover'
            width={64}
            height={64}
          />
        </div>
      </div>
      <div className='flex justify-between text-gray-600 text-sm my-5  border-gray-200'>
        <div className='flex items-center gap-2'>
          <Image
            src={profileImage}
            alt='프로필_이미지'
            width={24}
            height={24}
            className='w-6 h-6'
          />
          <span>{author}</span>
          <span className='text-gray-400'>{dateFormat(date)}</span>
        </div>
        <div className='flex items-center gap-1'>
          <CiHeart className='w-6 h-6' />
          <span>{likeCount > 9999 ? "9999+" : likeCount}</span>
        </div>
      </div>
    </div>
  );
}
