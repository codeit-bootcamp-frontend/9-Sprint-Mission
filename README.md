# 스프린트 미션 2

## 요구사항
  - HTML5
  - CSS3

### 기본

  - [o] 스프린트 미션 1 기본 및 심화요구사항 반영
  - [o] “판다마켓" 로고 클릭 시 루트 페이지(“/”)로 이동합니다.
  - [o] 로그인 페이지, 회원가입 페이지 모두 로고 위 상단 여백이 동일합니다.
  - [o] input 요소에 focus in 일 때, 테두리 색상은 #3692FF입니다.
  - [o] input 요소에 focus out 일 때, 테두리는 없습니다.
  - [o] SNS 아이콘들은 클릭시 각각 실제 서비스 홈페이지로 이동합니다.
  - [o] 로그인페이지에서 “회원가입”버튼 클릭 시 “/signup” 페이지로 이동합니다.
  - [o] 회원가입페이지에서 “로그인”버튼 클릭 시 “/login” 페이지로 이동합니다.

### 심화

  - [o] palette에 있는 color값들을 css 변수로 등록하고 사용해 주세요.
  - [o] 비밀번호 input 요소 위에 비밀번호를 확인할 수 있는 아이콘을 추가해 주세요.

### 변경사항

  - css 색상의 변수명에 피그마에 나와있는 부분을 적용했습니다.
  - 로그인 및 회원가입 페이지를 추가하고 구현하였습니다.
  - css 파일을 global 파일과 개별 파일들로 나누고 폴더에 넣어서 정리했습니다.
  - 로그인 및 회원가입 input 요소에 border 설정시, 요소를 클릭할 때마다의 크기변화에 의한 이질감이 있어서 border 대신 outline을 설정하였습니다.
  - 스프린트미션1에서의 다음 코드리뷰 개선사항을 반영하였습니다.
    - HTML 태그의 class, id명을 케밥케이스로 변경하였습니다.
    - rem 단위 사용시 px 값 계산의 편의를 위해 전역에 font-size: 62.5%를 추가하였습니다.
    - 앵커 태그의 기본 text-decoration 값을 none으로 지정해 주었습니다.

## 스크린샷

|                               메인페이지                                |                            로그인 페이지                                |
| :--------------------------------------------------------------------: | :--------------------------------------------------------------------: |
|       <img src="/images/mainPage.png" width="400" height="400">        |       <img src="/images/loginPage.png" width="400" height="400">       |  
|                               회원가입 페이지                           |
|       <img src="/images/signupPage.png" width="400" height="400">      |


## 멘토에게

  - 