import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { logout } from "@/api/auth";
import { useAtom } from "jotai";
import { userIdAtom, nicknameAtom, userImageAtom } from "@/store/auth";
import Logo from "@/images/logo/logo.svg";
import DefaultAvatar from "@/images/ui/ic_profile-32.png";

export default function Header() {
  const router = useRouter();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [nickname, setNickname] = useAtom(nicknameAtom);
  const [userImage, setUserImage] = useAtom(userImageAtom);

  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    const storedUserImage = Cookies.get("userImage");
    const storedNickname = Cookies.get("nickname");

    setUserId(storedUserId || null);
    if (
      storedUserImage &&
      storedUserImage.startsWith("https") &&
      /\.(png|svg|jpg)$/.test(storedUserImage)
    ) {
      setUserImage(storedUserImage);
    } else {
      setUserImage(DefaultAvatar.src);
    }
    setNickname(storedNickname || null);
  }, [setUserId, setUserImage, setNickname]);

  const handleLogout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("userId");
    Cookies.remove("nickname");
    Cookies.remove("userImage");
    setUserId(null);
    setNickname(null);
    setUserImage(null);
    await logout(() => router.push("/auth/login"));
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 py-4 flex justify-between items-center w-full">
        <Link href="/" className="mr-8">
          <Logo width={153} height={51} />
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
        {userId ? (
          <div className="relative group">
            <Image
              src={userImage || DefaultAvatar.src}
              alt="User Avatar"
              className="w-8 h-8 cursor-pointer rounded-full"
              width={32}
              height={32}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max bg-white border border-gray-300 rounded-md shadow-lg p-2 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {nickname && <div>{nickname}</div>}
              <button
                onClick={handleLogout}
                className="mt-2 text-gray-600 hover:text-blue-500"
              >
                로그아웃
              </button>
            </div>
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
