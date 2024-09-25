import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-wrap bg-[--color-black] h-[180px] px-6 py-8 justify-between lg:px-[400px]">
        <div className="text-[--color-gray400] order-3 md:order-1">©codeit - 2024</div>
        <div className="flex space-x-7 text-[--color-gray200] order-1 mr-14 md:order-2">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className="flex space-x-3 order-2 md:order-3">
          <Link href="https://www.facebook.com/?locale=ko_KR" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/ic_facebook.svg" alt="페이스북 로고" width={20} height={20} />
          </Link>
          <Link href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/ic_twitter.svg" alt="트위터 로고" width={20} height={20} />
          </Link>
          <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/ic_youtube.svg" alt="유튜브 로고" width={20} height={20} />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/icons/ic_instagram.svg" alt="인스타그램 로고" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;