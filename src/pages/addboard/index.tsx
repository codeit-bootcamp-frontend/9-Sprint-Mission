import { useState } from "react";
import styles from "./addboard.module.scss";
import axios from "@/src/lib/axios";

export default function AddBoard() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const isButtonDisabled = title.trim() === "" || content.trim() === "";

  const handleSubmit = async () => {
    if (isButtonDisabled) return;

    try {
      console.log("Access Token:", accessToken);
      const response = await axios.post(
        "/articles", // 게시물 등록 API 엔드포인트
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 포함
          },
        }
      );

      // 게시물 등록 성공 처리
      console.log("게시물 등록 성공:", response.data);
      // 필요 시 상태 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("게시물 등록 실패:", error);
      setError("게시물 등록에 실패했습니다."); // 에러 처리
    }
  };
  return (
    <div className="container">
      <h2 className="page-title">
        게시글 쓰기
        <button
          className="btn-box submit"
          type="button"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          등록
        </button>
      </h2>
      <div className={styles["addboard-wrap"]}>
        <div>
          <h3 className="sub-title">*제목</h3>
          <input
            type="text"
            name="title"
            className="form-input"
            value={title}
            placeholder="제목을 적어주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h3 className="sub-title">*내용</h3>
          <textarea
            name="content"
            className="form-input"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <h3 className="sub-title">*이미지</h3>
          <input type="file" id="file" accept="image/png, image/jpeg" />
        </div>
      </div>
    </div>
  );
}
