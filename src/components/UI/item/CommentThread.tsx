// src/components/UI/InputItem.tsx
import { useEffect, useState } from "react";
import { getProductComments } from "@/api/item";
import EmptyStateImage from "@/images/ui/empty-comments.svg";
import SeeMoreIcon from "@/images/icons/ic_kebab.svg";
import DefaultProfileImage from "@/images/ui/ic_profile.svg";
import { formatUpdatedAt } from "@/utils/dateUtils";
import { ProductComment, ProductCommentListResponse } from "@/types/comment";
import Image from "next/image";

interface CommentItemProps {
  item: ProductComment;
}

const CommentItem = ({ item }: CommentItemProps) => {
  const authorInfo = item.writer;
  const formattedTimestamp = formatUpdatedAt(item.updatedAt);

  return (
    <>
      <div className="py-6 relative">
        {/* 참고: 더보기 버튼 기능은 추후 요구사항에 따라 추가 예정 */}
        <button className="absolute right-0">
          <SeeMoreIcon className="w-6 h-6" />
        </button>

        <p className="text-base leading-[140%] mb-6">{item.content}</p>

        <div className="flex items-center gap-2">
          {authorInfo.image ? (
            <Image
              src={authorInfo.image}
              alt={`${authorInfo.nickname}님의 프로필 사진`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <DefaultProfileImage className="w-10 h-10 rounded-full" />
          )}

          <div>
            <p className="text-gray-600 text-sm mb-1">{authorInfo.nickname}</p>
            <p className="text-gray-400 text-xs">{formattedTimestamp}</p>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-0" />
    </>
  );
};

const EmptyState = () => {
  return (
    <div className="m-6 flex flex-col items-center gap-6">
      <EmptyStateImage className="w-24 h-24" />
      <p className="text-gray-400 text-base leading-6">아직 문의가 없습니다.</p>
    </div>
  );
};

interface CommentThreadProps {
  productId: number;
}

const CommentThread = ({ productId }: CommentThreadProps) => {
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params = {
        limit: 10,
      };

      try {
        const response: ProductCommentListResponse = await getProductComments({
          productId,
          params,
        });
        setComments(response.list);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("상품의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  if (isLoading) {
    return <div className="text-center py-4">상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">오류: {error}</div>;
  }

  if (comments && !comments.length) {
    return <EmptyState />;
  } else {
    return (
      <div className="mb-10">
        {comments.map((item) => (
          <CommentItem item={item} key={`comment-${item.id}`} />
        ))}
      </div>
    );
  }
};

export default CommentThread;
