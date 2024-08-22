# 스프린트 미션 7 

## 요구사항

- Javascript
- React 18.3.1
- react-router-dom 6.26.0
- axios 1.7.3

### 배포 웹사이트: https://codeit-react-mck.netlify.app

### 기본

- [x] 스프린트 미션 6까지의 기본 및 심화사항 반영
- [x] 상품 상세 페이지 주소는 “/items/{productId}” 입니다.
- [x] response 로 받은 아래의 데이터로 화면을 구현합니다.
  - favoriteCount : 하트 개수
  - images : 상품 이미지
  - tags : 상품태그
  - name : 상품 이름
  - description : 상품 설명
- [x] 목록으로 돌아가기 버튼을 클릭하면 중고마켓 페이지 주소인 “/items” 으로 이동합니다.
- [x] 문의하기에 내용을 입력하면 등록 버튼의 색상은 “3692FF”로 변합니다.
- [x] response 로 받은 아래의 데이터로 화면을 구현합니다.
  - image : 작성자 이미지
  - nickname : 작성자 닉네임
  - content : 작성자가 남긴 문구
  - description : 상품 설명
  - updatedAt : 문의글 마지막 업데이트 시간

### 변경사항

- 미션6에서의 코드리뷰 개선사항을 반영하였습니다. 
- 수정, 삭제버튼은 별도 모달로 처리하여 관련 로직을 만들었습니다.
- 임시로 만든 form 검증함수는 삭제하고, 문의사항들이 업데이트된 시간을 '1시간 전' 형식으로 바꾸는 함수를 만들었습니다.

## 스크린샷

|                                    상품 상세페이지                              |                                상품 상세페이지 (태블릿)                      |
| :----------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
|   <img src="/public/productDetailPage(Desktop).png" width="400" height="400">  | <img src="/public/productDetailPage(tablet).png" width="400" height="400"> |
|                                 상품 상세페이지 (모바일)                         |
|    <img src="/public/productDetailPage(Mobile).png" width="400" height="400">  |

## 멘토에게

- 로그인을 구현하지 않아서 get 제외한 api 요청에서 401 에러가 발생합니다. 8에서 추가하는 것이라면 8에 구현해 보겠습니다.

