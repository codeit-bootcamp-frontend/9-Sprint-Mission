import { COMMENT_TYPE } from "./comment-type";

// 인터페이스 정의
export interface CommentsSectionProps {
  id: number; // productId 또는 articleId에 대응
  type: typeof COMMENT_TYPE.product | typeof COMMENT_TYPE.article; // 도메인 타입
}
