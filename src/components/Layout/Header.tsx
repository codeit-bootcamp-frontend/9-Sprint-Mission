// src/components/Layout/Header.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import AlertModal from "@/components/UI/modal/AlertModal";
import { useAuth } from "@/hooks/useAuth";

// public 폴더 경로 문자열로 대체
const LOGO_SM = "/images/logo/logo_sm.png";
const LOGO_MD = "/images/logo/logo_md.png";
const LOGO_LG = "/images/logo/logo_lg.png";
const DEFAULT_AVATAR = "/images/ui/ic_profile-32.png";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      setAlertMessage("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsAlertOpen(true);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  // 드롭다운 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest(".user-avatar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // 메뉴 활성화 상태 확인
  const isCommunityActive = router.pathname.startsWith("/community") || router.pathname === "/addArticle";
  const isItemsActive = router.pathname.startsWith("/items") || router.pathname === "/addItem";

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-4 flex justify-between items-center w-full">
          <Link href="/" className="mr-8">
            <div
              className="relative min-w-[103] min-h-[51] max-w-[198px] max-h-[66px]"
              style={{ position: "relative" }}
            >
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
          {user && (
            <div className="relative user-avatar">
              <Image
                src={user.image || DEFAULT_AVATAR}
                alt="User Avatar"
                className="w-8 h-8 cursor-pointer rounded-full"
                width={32}
                height={32}
                onClick={toggleDropdown}
              />
              {isOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700">
                  <div>{user.nickname || "사용자"}</div>
                  <button onClick={handleLogout} className="mt-2 text-gray-600 hover:text-blue-500">
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}
          {!user && (
            <Link href="/auth/login" className="text-gray-600 font-semibold hover:text-blue-500">
              로그인
            </Link>
          )}
        </div>
      </header>

      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
}
