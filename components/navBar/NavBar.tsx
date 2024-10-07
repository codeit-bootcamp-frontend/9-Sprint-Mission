"use client";

import useToken from "@/hooks/useToken";
import { cls } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SignoutMenu from "../auth/SignoutMenu";

const NavBar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const context = useToken();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleOpenMenu = () => {
    setLogoutOpen((prev) => !prev);
  };

  const linkArr = [
    { href: "/boards", title: "자유게시판" },
    { href: "/items", title: "중고마켓" },
  ];

  return (
    <header>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full h-[70px] fixed top-0 px-4 py-0 z-20 bg-white shadow-md lg:px-[200px] lg:py-2">
          <div className="flex items-center space-x-5 md:space-x-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="로고"
                width={40}
                height={40}
                className="hidden md:block"
              />
              <h2 className="font-ROKAFSans font-bold text-[--color-theme] text-2xl">판다마켓</h2>
            </Link>
            <div className="flex items-center space-x-3 md:space-x-5">
              {linkArr.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={cls(
                    "text-[#4B5563] font-bold text-lg",
                    pathname.includes(link.href) ? "text-[--color-theme]" : ""
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          {!context?.session ? (
            <Link
              href="/signin"
              className="text-[#4B5563] font-bold text-lg px-6 py-2 rounded-lg bg-[--color-theme] hover:bg-[--color-theme-hover] text-[--color-gray100] transition-all"
            >
              로그인
            </Link>
          ) : (
            <>
              <button type="button" className="bg-none border-none relative" onClick={handleOpenMenu}>
                <Image src="/icons/sessionBtn.png" alt="개인메뉴버튼" width={40} height={40} />
              </button>
              {logoutOpen && <SignoutMenu />}
            </>
          )}
        </div>
        {children}
      </div>
    </header>
  );
};

export default NavBar;
