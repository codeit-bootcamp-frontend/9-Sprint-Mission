import { CommentDeleteAtom } from "@/atom/itemAtom";
import { useCommentDelete } from "@/hooks/useCommentDelete";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

interface CommentDeleteProps {
  commentId: number;
}

const CommentDelete = ({ commentId }: CommentDeleteProps) => {
  const { mutate: commentDeleteMutation } = useCommentDelete(commentId);
  const [isModalOpen, setIsModalOpen] = useAtom(CommentDeleteAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    try {
      commentDeleteMutation();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("댓글 삭제 실패", error.response?.data);
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return createPortal(
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 m-auto flex flex-col items-center justify-center space-y-6 w-80 h-40 bg-white rounded-lg shadow-lg z-40"
      >
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold">댓글을 삭제하시겠습니까?</h2>
          <div className="flex items-center space-x-3">
            <button onClick={handleDelete} className="custom-submit-button">
              삭제
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-white font-semibold border-[1px] border-panda-gray200 hover:bg-panda-theme hover:text-white rounded-lg px-6 py-3 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default CommentDelete;
