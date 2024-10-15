import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Logo from '@/images/logo/logo.svg';
import LogoMobile from '@/images/logo/logo-mobile.svg';
import ProfileIcon from '@/images/icons/ic_profile.png';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, setUser } = useAuth();
  console.log(user);

  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };
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
          <div className='flex items-center relative'>
            <p className='mr-4'>
              <span className='text-gray-700 font-semibold'>
                {user?.nickname}
              </span>
              님
            </p>
            <div className='relative'>
              <Image
                src={ProfileIcon}
                width={32}
                height={32}
                alt='Profile'
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className='cursor-pointer'
              />
              {dropdownVisible && (
                <div className='absolute right-0 top-full mt-2 px-5 bg-white border rounded shadow-lg'>
                  <button
                    onClick={handleLogout}
                    className='w-full p-2 hover:text-blue-600 cursor-pointer text-center '
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
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
