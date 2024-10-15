// src/components/Layout/Header.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { User } from "@/types/auth";
import { removeAllAuthCookies } from "@/utils/cookie";
import AlertModal from "@/components/UI/modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";

// public 폴더 경로 문자열로 대체
const LOGO_SM = "/images/logo/logo_sm.png";
const LOGO_MD = "/images/logo/logo_md.png";
const LOGO_LG = "/images/logo/logo_lg.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-32.png";

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await axios.post("/api/auth/refreshToken");
        if (response.status === 200 && response.data.isLogin) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("인증 상태 확인 중 오류 발생:", error);
        setUser(null);
      }
    }

    if (!user) {
      checkAuthStatus();
    }
  }, [setUser, user]);

  const handleLogout = async () => {
    try {
      await removeAllAuthCookies();
      setUser(null); // 사용자 상태를 null로 설정
      setIsOpen(false); // 드롭다운 메뉴 닫기
      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      setAlertMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsAlertOpen(true);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 상태를 토글
  };

  // AlertModal 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false); // 모달 닫기
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

  // 자유게시판 및 중고마켓 메뉴 활성화 여부 설정
  const isCommunityActive =
    router.pathname.startsWith("/community") ||
    router.pathname === "/addArticle";
  const isItemsActive =
    router.pathname.startsWith("/items") || router.pathname === "/addItem";

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-4 flex justify-between items-center w-full">
          <Link href="/" className="mr-8">
            {/* 로고 이미지 변경 */}
            <div
              className="relative min-w-[103] min-h-[51] max-w-[198px] max-h-[66px]"
              style={{ position: "relative" }}
            >
              {/* 작은 화면용 로고 */}
              <div className="block sm:hidden">
                <Image
                  src={LOGO_SM}
                  width={103}
                  height={51}
                  alt="Logo Small"
                  sizes="(max-width: 768px) 100vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {/* 중간 화면용 로고 */}
              <div className="hidden sm:block md:hidden">
                <Image
                  src={LOGO_MD}
                  width={153}
                  height={51}
                  alt="Logo Medium"
                  sizes="(max-width: 1024px) 50vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {/* 큰 화면용 로고 */}
              <div className="hidden md:block">
                <Image
                  src={LOGO_LG}
                  width={198}
                  height={66}
                  alt="Logo Large"
                  sizes="(min-width: 1280px) 33vw"
                  style={{ objectFit: "contain" }}
                  priority={true}
                />
              </div>
            </div>
          </Link>
          <nav className="flex-grow">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/community"
                  className={`text-xl font-semibold hover:text-blue-600 ${
                    isCommunityActive ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  자유게시판
                </Link>
              </li>
              <li>
                <Link
                  href="/items"
                  className={`text-xl font-semibold hover:text-blue-600 ${
                    isItemsActive ? "text-blue-500" : "text-gray-600"
                  }`}
                >
                  중고마켓
                </Link>
              </li>
            </ul>
          </nav>
          {user?.id ? (
            <div className="relative user-avatar">
              <Image
                src={user.image || DEFAULT_AVATAR}
                alt="User Avatar"
                className="w-8 h-8 cursor-pointer rounded-full"
                width={32}
                height={32}
                onClick={toggleDropdown} // 클릭으로 드롭다운 토글
              />
              {isOpen && ( // 드롭다운 열기
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700">
                  {user.nickname ? (
                    <div>{user.nickname}</div>
                  ) : (
                    <div>사용자</div>
                  )}
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

      {/* AlertModal 컴포넌트 */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </>
  );
}
