export interface Writer {
  id: number; // 작성자 ID
  nickname: string; // 작성자 닉네임
  image: string | null; // 작성자 이미지 (optional)
}

export interface Board {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: string;
  createdAt: Date;
  writer: Writer;
}

export interface Comment {
  id: number; // 댓글 ID
  content: string; // 댓글 내용
  createdAt: Date; // 생성 날짜
  updatedAt: Date; // 수정 날짜
  writer: Writer;
}
