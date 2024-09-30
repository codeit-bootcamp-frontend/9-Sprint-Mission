import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import Logo from '@/images/logo/logo.svg'; // SVG 파일을 React 컴포넌트로 임포트

export default function Header() {
  const router = useRouter();
  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto px-10 py-4 flex justify-between items-center w-full'>
        <Link href='/' className='mr-8'>
          <Logo width={153} height={51} alt='Logo' /> {/* SVG 컴포넌트 사용 */}
        </Link>
        <nav className='flex-grow'>
          <ul className='flex space-x-6'>
            <li>
              <Link
                href='/community'
                className={`font-semibold hover:text-blue-600 ${
                  router.pathname.startsWith('/community')
                    ? 'text-blue-500'
                    : 'text-gray-600'
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href='/items'
                className={`font-semibold hover:text-blue-600 ${
                  router.pathname.startsWith('/items')
                    ? 'text-blue-500'
                    : 'text-gray-600'
                }`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href='/login'
          className='
            bg-[#3692FF] text-white font-semibold text-center hover:bg-[#1E6ED9] rounded-[8px] px-[23px] py-[12px] gap-[10px]transition-colors duration-300 md:w-[140px] md:h-[50px] md:px-[25px] md:py-[14px] lg:h-[56px] lg:px-[30px] lg:py-[16px]'
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
