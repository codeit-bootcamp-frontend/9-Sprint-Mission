// src/components/Layout/Header.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { logout } from "@/api/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { isValidImageUrl } from "@/utils/imageUtils";

// public 폴더 경로 문자열로 대체
const LogoSM = "/images/logo/logo_sm.png";
const LogoMD = "/images/logo/logo_md.png";
const LogoLG = "/images/logo/logo_lg.png";
const DefaultAvatar = "/images/ui/ic_profile-32.png";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    const storedUserImage = Cookies.get("userImage");
    const storedNickname = Cookies.get("nickname");

    setUser({
      Id: storedUserId || null,
      Image:
        storedUserImage && isValidImageUrl(storedUserImage)
          ? `/api/imageProxy?url=${encodeURIComponent(storedUserImage)}`
          : DefaultAvatar,
      nickname: storedNickname || null,
    });
  }, [setUser]);

  const handleLogout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    Cookies.remove("nickname");
    Cookies.remove("userImage");

    setUser({
      Id: null,
      Image: null,
      nickname: null,
    });

    await logout(() => router.push("/auth/login"));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 상태를 토글
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(".user-avatar")) {
        setIsOpen(false); // 다른 곳을 클릭하면 드롭다운 닫기
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]); // 의존성 배열에 isOpen 추가

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 py-4 flex justify-between items-center w-full">
        <Link href="/" className="mr-8">
          {/* 로고 이미지 변경 */}
          <div className="relative w-[153px] h-[51px]">
            {/* 작은 화면용 로고 */}
            <div className="block sm:hidden">
              <Image
                src={LogoSM}
                alt="Logo Small"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {/* 중간 화면용 로고 */}
            <div className="hidden sm:block md:hidden">
              <Image
                src={LogoMD}
                alt="Logo Medium"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            {/* 큰 화면용 로고 */}
            <div className="hidden md:block">
              <Image
                src={LogoLG}
                alt="Logo Large"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </Link>
        <nav className="flex-grow">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/community"
                className={`font-semibold hover:text-blue-600 ${
                  router.pathname.startsWith("/community")
                    ? "text-blue-500"
                    : "text-gray-600"
                }`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`font-semibold hover:text-blue-600 ${
                  router.pathname.startsWith("/items")
                    ? "text-blue-500"
                    : "text-gray-600"
                }`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
        {user.Id ? (
          <div className="relative user-avatar">
            <Image
              src={user.Image || DefaultAvatar}
              alt="User Avatar"
              className="w-8 h-8 cursor-pointer rounded-full"
              width={32}
              height={32}
              onClick={toggleDropdown} // 클릭으로 드롭다운 토글
            />
            {isOpen && ( // 드롭다운 열기
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700">
                {user.nickname && <div>{user.nickname}</div>}
                <button
                  onClick={handleLogout}
                  className="mt-2 text-gray-600 hover:text-blue-500"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="text-gray-600 font-semibold hover:text-blue-500"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
