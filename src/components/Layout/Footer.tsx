import React from "react";
import Link from "next/link";
import FacebookLogo from "@/images/social/facebook-logo.svg";
import TwitterLogo from "@/images/social/twitter-logo.svg";
import YoutubeLogo from "@/images/social/youtube-logo.svg";
import InstagramLogo from "@/images/social/instagram-logo.svg";

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
          <FacebookLogo width={20} height={20} />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterLogo width={20} height={20} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YoutubeLogo width={20} height={20} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogo width={20} height={20} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
