# FE9 Weekly Mission

이 프로젝트는 [Next.js](https://nextjs.org)를 기반으로 만들어진 주간 미션 프로젝트입니다.

## 배포 사이트

프로젝트는 다음 URL에서 확인할 수 있습니다: [https://next-panda-market.vercel.app](https://next-panda-market.vercel.app)

## 시작하기

먼저, 개발 서버를 실행하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 사용된 기술 스택

- [Next.js](https://nextjs.org/) - React 기반의 웹 애플리케이션 프레임워크
- [React](https://reactjs.org/) - UI 구축을 위한 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - JavaScript의 정적 타입 검사 확장
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티-퍼스트 CSS 프레임워크
- [Jotai](https://jotai.org/) - React 상태 관리 라이브러리

## 주요 의존성

- next: 14.2.12
- react: ^18
- react-dom: ^18
- axios: ^1.7.7
- date-fns: ^4.1.0
- jotai: ^2.10.0
- js-cookie: ^3.0.5
- react-hook-form: ^7.53.0
- react-router-dom: ^6.26.2
- react-spinners: ^0.14.1
- sharp: ^0.33.5
- tailwind-merge: ^2.5.2

## 개발 의존성

- typescript: ^5
- eslint: ^8
- eslint-config-next: 14.2.12
- autoprefixer: ^10.4.20
- postcss: ^8.4.47
- tailwindcss: ^3.4.13

## 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 모드로 서버 실행
- `npm run lint`: 린트 검사 실행
- `npm run clean`: 빌드 폴더 삭제

## Tailwind CSS 설정

Tailwind CSS는 커스텀 테마를 지원하며, 설정은 `tailwind.config.ts` 파일에서 관리됩니다.

## Webpack 설정

SVG 파일 처리를 위해 `@svgr/webpack`을 사용하며, 특정 Node.js 모듈(`fs`, `path`, `os`)은 브라우저에서 비활성화되어 있습니다.

## 더 알아보기

- [Next.js 문서](https://nextjs.org/docs) - 기능과 API에 대해 알아보세요.
- [Next.js 학습](https://nextjs.org/learn) - 대화형 튜토리얼 체험.

## 배포

Next.js 앱을 배포하는 가장 쉬운 방법은 [Vercel 플랫폼](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.
