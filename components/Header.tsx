import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/panda_logo.png";
import profileImage from "@/public/profileImg.png";
import { useRouter } from "next/router";

const menuData = [
  { id: "board", name: "자유게시판", path: "/boards" },
  { id: "market", name: "중고마켓", path: "/market" },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className='flex justify-between items-center py-2 px-10 border-#dfdfdf border-b'>
      <div className='flex shrink-0 gap-10 items-center'>
        <div className='flex items-center gap-2'>
          <Image className='w-10 h-10' src={logoImage} alt='로고_이미지' />
          <Link className='text-2xl font-bold text-primary-100' href='/'>
            판다마켓
          </Link>
        </div>
        <nav className='flex gap-4'>
          {menuData.map((item) => {
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={
                    item.path === router.pathname
                      ? "text-primary-100 font-semibold"
                      : ""
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </nav>
      </div>
      <div>
        <Image className='w-10 h-10' src={profileImage} alt='프로필_사진' />
      </div>
    </header>
  );
}
