// src/components/UI/SocialLogin.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";

// public 폴더 경로 문자열로 대체
const GOOGLE_LOGO = "/images/social/google-logo.png";
const KAKAO_LOGO = "/images/social/kakao-logo.png";

interface SocialLoginLinkProps {
  name: string;
  url: string;
  logoSrc: string | StaticImageData;
}

const SocialLoginLink = ({ name, url, logoSrc }: SocialLoginLinkProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="block"
    >
      <Image src={logoSrc} alt={name} width={42} height={42} />
    </a>
  );
};

const SocialLogin = () => {
  return (
    <div className="bg-blue-100 rounded-lg flex items-center justify-between p-4 my-6">
      <div className="font-medium text-base">간편 로그인하기</div>

      <div className="flex gap-4">
        <SocialLoginLink
          name="구글 로그인"
          url="https://www.google.com/"
          logoSrc={GOOGLE_LOGO}
        />
        <SocialLoginLink
          name="카카오톡 로그인"
          url="https://www.kakaocorp.com/page/"
          logoSrc={KAKAO_LOGO}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
