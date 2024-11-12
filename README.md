# FE9 Weekly Mission

## 소개

이 프로젝트는 Next.js를 기반으로 만들어진 주간 미션 프로젝트입니다. 최신 웹 개발 기술 스택을 활용하여 구축되었습니다.

## 기술 스택

### 핵심 의존성

[![Next.js](https://img.shields.io/badge/Next.js-14.2.12-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

### 상태 관리 & API

[![React Query](https://img.shields.io/badge/@tanstack/react--query-5.59.20-FF4154?logo=react-query)](https://tanstack.com/query)
[![Jotai](https://img.shields.io/badge/Jotai-2.10.0-black)](https://jotai.org/)
[![Axios](https://img.shields.io/badge/Axios-1.7.7-5A29E4?logo=axios)](https://axios-http.com/)

### 폼 & 유효성 검증

[![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-7.53.1-EC5990)](https://react-hook-form.com/)
[![HookForm Resolvers](https://img.shields.io/badge/@hookform/resolvers-3.9.1-EC5990)](https://github.com/react-hook-form/resolvers)
[![Zod](https://img.shields.io/badge/Zod-3.23.8-3068B7)](https://zod.dev/)

### UI/UX

[![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-2.4.1-FF4444)](https://react-hot-toast.com/)
[![React Spinners](https://img.shields.io/badge/React%20Spinners-0.14.1-36D7B7)](https://www.davidhu.io/react-spinners/)
[![Tailwind Merge](https://img.shields.io/badge/Tailwind%20Merge-2.5.2-38B2AC)](https://github.com/dcastil/tailwind-merge)

### 유틸리티

[![Sharp](https://img.shields.io/badge/Sharp-0.33.5-99CC00)](https://sharp.pixelplumbing.com/)
[![date-fns](https://img.shields.io/badge/date--fns-4.1.0-yellow)](https://date-fns.org/)
[![Form Data](https://img.shields.io/badge/Form%20Data-4.0.0-green)](https://github.com/form-data/form-data)
[![Formidable](https://img.shields.io/badge/Formidable-3.5.1-orange)](https://github.com/node-formidable/formidable)

## 프로젝트 설정

### TailwindCSS 설정

`tailwind.config.ts`에서 다음과 같이 설정되어 있습니다:

- Page Router의 모든 페이지 파일 포함
- 커스텀 색상 (background, foreground)
- Pretendard 폰트 패밀리 설정
- 커스텀 spacing 값 (70px)

### Next.js 설정

`next.config.mjs`의 주요 설정:

- 이미지 최적화: 모든 외부 도메인의 이미지 허용
- SVG 파일 처리를 위한 @svgr/webpack 설정
- Node.js 모듈 (fs, path, os) fallback 설정

### TypeScript 설정

`tsconfig.json`의 주요 설정:

- 엄격한 타입 검사 활성화
- 절대 경로 설정 (@/_ -> ./src/_)
- Next.js 플러그인 지원
- 커스텀 타입 정의 지원

### 미들웨어 설정

인증 및 라우팅 보호를 위한 미들웨어 구현:

- 공개 페이지: /, /login, /signup
- 이미지 프록시 처리
- API 라우트 보호
- 인증 상태에 따른 리다이렉션

## 시작하기

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 브라우저에서 확인:
   [http://localhost:3000](http://localhost:3000)

## 사용 가능한 스크립트

```bash
npm run dev    # 개발 서버 실행
npm run build  # 프로덕션 빌드
npm run start  # 프로덕션 서버 실행
npm run lint   # 린트 검사
npm run clean  # 빌드 폴더 정리
```

## 더 알아보기

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://reactjs.org/)
- [TypeScript 문서](https://www.typescriptlang.org/)
- [TailwindCSS 문서](https://tailwindcss.com/)

## 배포

이 프로젝트는 [Vercel Platform](https://vercel.com)을 통해 쉽게 배포할 수 있습니다.
