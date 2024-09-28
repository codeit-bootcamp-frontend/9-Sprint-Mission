# API 핸들러 설명

## 핸들러 함수

핸들러 함수는 모든 API 요청을 처리하는 메인 함수입니다. 요청의 HTTP 메서드에 따라 적절한 함수를 호출합니다.

### GET 요청 처리

- GET 요청이 들어오면, `articleId`가 있는 경우 `getArticleDetail` 함수를 호출하여 특정 게시글의 세부 정보를 가져옵니다.
- `articleId`가 없는 경우 `getArticles` 함수를 호출하여 게시글 목록을 가져옵니다.

### POST 및 DELETE 요청 처리

- POST 요청은 `likeArticle` 함수를 호출하여 게시글에 좋아요를 추가합니다.
- DELETE 요청은 `unlikeArticle` 함수를 호출하여 게시글의 좋아요를 취소합니다.
