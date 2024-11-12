"use client";

import { authAtom } from "@/atom/authAtom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logout from "./Logout";

const Navbar = () => {
  const pathname = usePathname();
  const isAuth = useAtomValue(authAtom);
  const logoutRef = useRef<HTMLDivElement>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleOpenMenu = () => {
    setLogoutOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
      setLogoutOpen(false);
    }
  };

  const linkArr = [
    { href: "/boards", title: "자유게시판" },
    { href: "/items", title: "중고마켓" },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full h-[70px] fixed top-0 px-4 py-0 z-20 bg-white shadow-md lg:px-[200px] lg:py-2">
          <div className="flex items-center space-x-5 md:space-x-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/icons/logo.png"
                alt="로고"
                width={40}
                height={40}
                className="hidden md:block"
              />
              <h2 className="font-ROKAFSans font-bold text-panda-theme text-2xl">판다마켓</h2>
            </Link>
            <div className="flex items-center space-x-3 md:space-x-5">
              {linkArr.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`text-panda-gray600 font-bold text-lg ${
                    pathname.includes(link.href) ? "text-panda-theme" : ""
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          {isAuth ? (
            <div ref={logoutRef}>
              <button type="button" className="relative" onClick={handleOpenMenu}>
                <Image src="/icons/sessionBtn.png" alt="개인메뉴버튼" width={40} height={40} />
              </button>
              {logoutOpen && <Logout />}
            </div>
          ) : (
            <Link
              href="/signin"
              className="text-panda-gray100 font-bold text-lg px-6 py-2 rounded-lg bg-panda-theme hover:bg-panda-theme-hover transition-all"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
