import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./addboard.module.scss";
import axios from "@/src/lib/axios";

export default function AddBoard() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isButtonDisabled = title.trim() === "" || content.trim() === "";

  const handleSubmit = async () => {
    if (isButtonDisabled) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    // 이미지 업로드 처리
    let imageUrl: string | undefined;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const imageResponse = await axios.post("/upload", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = imageResponse.data.imageUrl; // 이미지 URL
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setError("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    // 게시물 등록
    try {
      const response = await axios.post(
        "/articles",
        {
          title,
          content,
          image: imageUrl, // 이미지 URL 포함
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("게시물 등록 성공:", response.data);
      // 게시물 상세 페이지로 이동
      router.push(`/boards/${response.data.id}`);
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
      {error && <p className="error-message">{error}</p>}
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
          <input
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
