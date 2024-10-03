# 스프린트 미션 10 

## 요구사항

- Javascript
- React 18
- Next.js 14.2.13
- Tailwind CSS 3.4.1
- axios 1.7.7
- react-hook-form 7.53.0
- zod 3.23.8
- react-hot-toast 2.4.1
- typescript 5

### 배포 웹사이트: https://codeit-nextjs-mission.netlify.app/

### 기본

- [x] 게시글 등록 페이지 주소는 “/addboard” 입니다.
- [x] 게시판 이미지는 최대 한개 업로드가 가능합니다.
- [x] 각 input의 placeholder 값을 정확히 입력해주세요.
- [x] 이미지를 제외하고 input 에 모든 값을 입력하면 ‘등록' 버튼이 활성화 됩니다.
- [x] 게시글 상세 페이지 주소는  “/board/{id}” 입니다.
- [x] 댓글 input 값을 입력하면  ‘등록' 버튼이 활성화 됩니다.
- [x] 자유게시판 페이지에서 게시글을 누르면 게시물 상세 페이지로 이동합니다.
- [x] 댓글 input 값을 입력하면  ‘등록' 버튼이 활성화 됩니다.

### 심화

- [x] 회원가입, 로그인 api를 사용하여 받은 accessToken을 사용하여 게시물 등록을 합니다.
- [x] ‘등록’ 버튼을 누르면 게시물 상세 페이지로 이동합니다.

### 변경사항

- Next.js의 error boundary 기능을 적용했습니다. (09-28)
- error boundary 적용 이후 불필요한 에러처리 코드를 삭제했습니다. (09-30)
- window 객체를 찾을 수 없어 배포 시 빌드하면서 오류가 발생했던 것을 조건을 추가하여 해결했습니다. (09-30)
- 자유게시판, 중고마켓의 map 반복문 코드를 별도 컴포넌트로 분리했습니다. (09-30)
- 민감정보가 없는 api 요청은 api로 이동했다가 요청할 필요없이 해당 컴포넌트에서 진행하도록 수정했습니다. (09-30)
- SearchForm 컴포넌트에서 form에 들어있을 필요없는 select 요소를 밖으로 빼냈습니다. (10-03)

## 스크린샷

|                            게시글올리기 페이지 (데스크탑)                        |                       게시글 세부페이지 (데스크탑)                             |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------:  |
|   <img src="/public/images/addBoard(desktop).png" width="400" height="400">    | <img src="/public/images/postDetail(desktop).png" width="400" height="400"> |       

## 멘토에게

- 감사합니다.
- app router에서 데이터를 불러오면서 정적생성을 하려면 반드시 fetch()를 사용해야 하나요? axios를 사용하면서 generateStaticParams()를 함께 적용해보려고 하는데 궁금합니다.