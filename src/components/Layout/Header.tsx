import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Logo from '@/images/logo/logo.svg';
import LogoMobile from '@/images/logo/logo-mobile.svg';
import ProfileIon from '@/images/icons/ic_profile.png';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const accessToken = localStorage.getItem('accessToken');

  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto md:px-10 py-4 flex justify-between items-center w-full'>
        <Link href='/' className='md:mr-8'>
          {isMobile ? (
            <LogoMobile width={110} height={51} alt='Logo' />
          ) : (
            <Logo width={153} height={51} alt='Logo' />
          )}
        </Link>
        <nav className='flex-grow'>
          <ul className='flex space-x-2 md:space-x-6'>
            <li>
              <Link
                href='/boards'
                className={`font-semibold hover:text-blue-600 ${
                  router.pathname.startsWith('/boards')
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
        {accessToken ? (
          <Image src={ProfileIon} width={32} height={32} alt='Profile' />
        ) : (
          <Link
            href='/login'
            className='
              bg-[#3692FF] text-white font-semibold text-center hover:bg-[#1E6ED9] rounded-[6px] px-[15px] py-[8px] gap-[10px] transition-colors duration-300 md:w-[120px] md:h-[40px] md:px-[20px] md:py-[10px] lg:h-[46px] lg:px-[25px] lg:py-[12px]'
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
