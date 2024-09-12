export interface Comment {
  id: number;
  content: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}

// API 응답 인터페이스 정의

// 성공 응답: nextCursor와 list를 포함한 응답
export interface SuccessResponse {
  nextCursor: number | null;
  list: Comment[];
}

// 에러 응답: message만 포함한 응답
export interface ErrorResponse {
  message: string;
}

// 유니온 타입으로 정의
export type CommentsResponse = SuccessResponse | ErrorResponse;
