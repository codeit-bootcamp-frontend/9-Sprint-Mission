# 스프린트 미션 8 

## 요구사항

- Javascript
- React 18.3.1
- react-router-dom 6.26.0
- axios 1.7.3
- react-hook-form 7.53.0
- zod 3.23.8
- react-hot-toast 2.4.1
- typescript 4.9.5

### 배포 웹사이트: https://codeit-react-mck.netlify.app

### 기본

- [x] 스프린트 미션 7까지의 기본 및 심화사항 반영
- [x] 스프린트 미션 1 ~ 7에 대해 typescript를 적용해주세요.

### 변경사항

- 스프린트 미션 11과 겹치는 부분이 많아서 일부 기능을 미리 적용했습니다.
  - react-hook-form과 zod로 검색을 제외한 form에 적용했습니다.
  - 로그인, 로그아웃기능을 구현했습니다. (localstorage에 accessToken을 저장하는 정도로만 했습니다. refreshToken도 적용해보겠습니다.)
  - addItem에도 react-hook-form과 zod를 적용하고 태그 옆의 X 버튼 경로를 수정했습니다. (09.14)
  - error boundary를 적용하였습니다. (09-15)

## 스크린샷

|                                    메인페이지                                   |                                상품 상세페이지                              |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|   <img src="/public/images/mainPage.png" width="400" height="400">             | <img src="/public/images/productDetailPage.png" width="400" height="400">  |
|                                 로그인페이지                                    |                               로그아웃페이지                                |
|    <img src="/public/images/signinPage.png" width="400" height="400">          | <img src="/public/images/signupPage.png" width="400" height="400">         |

## 멘토에게

- 감사합니다.
- 추상화에 대해 더 노력해서 만들어보겠습니다.
