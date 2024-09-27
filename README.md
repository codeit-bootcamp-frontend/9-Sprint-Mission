# 스프린트 미션 9 

## 요구사항

- Javascript
- React 18.3.1
- Next.js 14.2.13
- Tailwind CSS 3.4.1
- axios 1.7.7
- react-hook-form 7.53.0
- zod 3.23.8
- react-hot-toast 2.4.1
- typescript 5

### 배포 웹사이트: https://codeit-nextjs-mission.netlify.app/

### 기본

- [x] 스프린트 미션 8까지의 기본 및 심화사항 반영
- [x] 자유 게시판 페이지 주소는 “/boards” 입니다.
- [x] 전체 게시글에서 드롭 다운으로 “최신 순” 또는 “좋아요 순”을 선택해서 정렬을 할 수 있습니다.
- [x] 게시글 목록 조회 api를 사용하여 베스트 게시글, 게시글을 구현합니다.
- [x] 게시글 title에 검색어가 일부 포함되면 검색이 됩니다.

### 심화

- [x] 반응형으로 보여지는 베스트 게시판 개수를 다르게 설정할때 서버에 보내는 pageSize값을 적절하게 설정합니다.
- [x] next의 data prefetch 기능을 사용해봅니다.

### 변경사항

- Next.js로 전환하고 tailwind css를 적용했습니다.
- 이미지를 가져오는 경로가 image api를 통해 업로드하지 않은 이미지가 너무 많아서 전체 경로에서 들어올 수 있도록 수정했습니다.
- Next.js의 error boundary 기능을 적용했습니다. (09-28)

## 스크린샷

|                            자유게시판 페이지 (데스크탑)                          |                       자유게시판 페이지 (태블릿)                             |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|   <img src="/public/images/boardsDesktop.png" width="400" height="400">        | <img src="/public/images/boardsTablet.png" width="400" height="400">       |
|                            자유게시판 페이지 (모바일)                            |                                 
|    <img src="/public/images/boardsMobile.png" width="400" height="400">        |          

## 멘토에게

- 감사합니다.
- 추상화에 대해 더 노력해서 만들어보겠습니다.