"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const footerArr = [
    { href: "https://www.google.com/", imgSrc: "/icons/googleLogo.svg", imgAlt: "구글" },
    { href: "https://www.kakaocorp.com/page/", imgSrc: "/icons/kakaoLogo.svg", imgAlt: "카카오" },
  ];

  return (
    <div className="flex flex-col space-y-6 px-4 items-center my-20 md:w-[640px] md:min-h-screen md:justify-center md:mt-0 md:m-auto">
    <Link href="/" className="flex items-center space-x-3">
      <Image src="/images/logo.png" alt="로고" width={51} height={51} className="md:w-[103px]" />
      <h2 className="font-ROKAFSans text-4xl md:text-6xl text-[--color-theme]">판다마켓</h2>
    </Link>
    {children}
    <div className="flex items-center justify-between bg-[--color-bg-skyblue] rounded-lg px-6 py-4 w-full">
      <h2>간편 로그인하기</h2>
      <div className="flex items-center space-x-4">
        {footerArr.map((link, i) => (
          <Link key={i} href={link.href} target="_blank" rel="noopener noreferrer">
            <Image src={link.imgSrc} alt={link.imgAlt} width={42} height={42} />
          </Link>
        ))}
      </div>
    </div>
    <div className="flex items-center space-x-1 text-sm">
      <h3 className="font-medium">{pathname === "/signin" ? "판다마켓이 처음이신가요?" : "이미 회원이신가요?"}</h3>
      {pathname === "/signin" ? <Link href="/signup" className="underline text-[--color-theme]">회원가입</Link> : <Link href="/signin" className="underline text-[--color-theme]">로그인</Link>}
    </div>
  </div>
  );
}

export default AuthLayout;