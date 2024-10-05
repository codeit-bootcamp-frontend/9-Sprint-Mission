import useAxios from "@/hooks/useAxios";
import { Article as ArticleType } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ArticleView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, setLoading } = useAxios<ArticleType>(`articles/${id}`);

  useEffect(() => {
    if (!data && !loading) setLoading(true);
  }, [id]);

  if (loading || !data) return <div>Loading...</div>;

  const { title, content, likeCount, updatedAt, isLiked } = data as ArticleType;

  const nickname = (data && data.writer.nickname) || "unknown";

  return (
    <>
      <div className="article">
        <div>
          <div>{title}</div>
          <div> ... </div>
        </div>
        <div className="nickname-date-like">
          <div>{nickname}</div>
          <div>{updatedAt}</div>
          <div>{likeCount}</div>
        </div>
        <div className="article-content">{content}</div>
      </div>
    </>
  );
}
