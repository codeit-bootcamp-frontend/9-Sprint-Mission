# FE9 Sprint Mission

## 소개

이 프로젝트는 Next.js Page Router 기반의 커뮤니티 및 중고마켓 플랫폼입니다. 사용자들은 게시글을 작성하고, 상품을 등록하며, 댓글과 좋아요 기능을 통해 상호작용할 수 있습니다.

## 주요 기능

### 커뮤니티

- 게시글 CRUD
- 댓글 시스템
- 좋아요 기능
- 베스트 게시글
- 실시간 검색
- 정렬 기능 (최신순/인기순)

### 중고마켓

- 상품 등록/수정/삭제
- 상품 문의
- 찜하기 기능
- 베스트 상품
- 검색 및 정렬

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

### 환경 설정

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 프로덕션 빌드:

```bash
npm run build
```

4. 프로덕션 서버 실행:

```bash
npm run start
```

### 주요 설정 파일

#### TailwindCSS (tailwind.config.ts)

- 커스텀 색상 및 스페이싱
- Pretendard 폰트 설정
- 반응형 디자인 지원

#### Next.js (next.config.mjs)

- 이미지 최적화 설정
- SVG 파일 처리
- Node.js 모듈 설정

#### TypeScript (tsconfig.json)

- 엄격한 타입 검사
- 절대 경로 설정
- Next.js 타입 지원

### 미들웨어

- 인증 보호
- API 라우트 보호
- 이미지 프록시 처리

## 폴더 구조

```
src/
├── components/
│   ├── Layout/
│   ├── UI/
│   │   ├── community/
│   │   ├── item/
│   │   └── comment/
├── hooks/
├── pages/
├── store/
├── types/
└── utils/
```

## 개발 가이드

### 컴포넌트 작성

- 재사용 가능한 UI 컴포넌트는 `components/UI` 폴더에 위치
- 레이아웃 관련 컴포넌트는 `components/Layout` 폴더에 위치
- Props 타입은 명시적으로 정의

### 상태 관리

- 전역 상태는 Jotai 사용
- 서버 상태는 React Query 사용
- 폼 상태는 React Hook Form 사용

### 스타일링

- TailwindCSS 클래스 사용
- 반응형 디자인 적용
- tailwind-merge로 클래스 충돌 방지

### 참고 문서

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://reactjs.org/)
- [TailwindCSS 문서](https://tailwindcss.com/)

## 배포

이 프로젝트는 [Vercel Platform](https://vercel.com)을 통해 쉽게 배포할 수 있습니다.
