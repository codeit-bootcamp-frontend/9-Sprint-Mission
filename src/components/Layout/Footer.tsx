import React from "react";
import Link from "next/link";
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const FacebookLogo = "/images/social/ic_facebook.png";
const TwitterLogo = "/images/social/ic_twitter.png";
const YoutubeLogo = "/images/social/ic_youtube.png";
const InstagramLogo = "/images/social/ic_instagram.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-base p-8 flex justify-between items-center flex-wrap gap-6 md:px-[104px] md:pb-[108px] lg:px-[200px] lg:pb-[108px]">
      {/* Copyright Section */}
      <div className="order-3 w-full md:order-none md:w-auto text-center md:text-left">
        ©codeit - 2024
      </div>

      {/* Footer Menu Links */}
      <div className="flex gap-6 text-gray-200">
        <Link href="/privacy" className="hover:text-white">
          Privacy
        </Link>
        <Link href="/policy" className="hover:text-white">
          Policy
        </Link>
        <Link href="/faq" className="hover:text-white">
          FAQ
        </Link>
      </div>

      {/* Social Media Links */}
      <div className="flex gap-3">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={FacebookLogo} width={20} height={20} alt="facebook" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={TwitterLogo} width={20} height={20} alt="twitter" />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={YoutubeLogo} width={20} height={20} alt="youtube" />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={InstagramLogo} width={20} height={20} alt="instagram" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
