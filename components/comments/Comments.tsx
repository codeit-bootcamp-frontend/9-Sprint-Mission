import { CommentType } from "@/app/items/types/Items";
import { CommentEditAtom } from "@/atom/itemAtom";
import ItemMenu from "@/components/ui/ItemMenu";
import { formatCommentsTime } from "@/lib/utils";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentEdit from "./CommentEdit";
import useToken from "@/hooks/useToken";

interface CommentsProps {
  commentsData: CommentType["list"];
}

const Comments = ({ commentsData }: CommentsProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const { getAccessToken } = useToken();
  const accessToken = getAccessToken();

  const isEdit = useAtomValue(CommentEditAtom);

  useEffect(() => {
    if (!isEdit) {
      setOpenMenuId(null);
    }
  }, [isEdit]);

  return commentsData.map((comment) => (
    <div key={comment.id} className="flex flex-col space-y-6 bg-[#FCFCFC]">
      <div className="flex items-center justify-between">
        {isEdit && editCommentId === comment.id ? (
          <CommentEdit comment={comment.content} id={comment.id} />
        ) : (
          <p className="text-sm">{comment.content}</p>
        )}
        <div className="relative">
          {!isEdit && accessToken && (
            <button
              onClick={() => {
                setOpenMenuId(openMenuId === comment.id ? null : comment.id);
                setEditCommentId(comment.id);
              }}
            >
              <Image src="/icons/itemMenu.png" alt="메뉴" width={24} height={24} />
            </button>
          )}
          {openMenuId === comment.id && !isEdit && accessToken && (
            <ItemMenu menu1="수정하기" menu2="삭제하기" id={comment.id} location="comment" />
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 pb-3 border-b border-panda-gray200">
        <Image
          src={comment.writer.image || "/icons/sessionBtn.png"}
          alt="유저프로필"
          width={32}
          height={32}
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-xs text-panda-gray600">{comment.writer.nickname}</h3>
          <span className="text-xs text-panda-gray400">
            {formatCommentsTime(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  ));
};

export default Comments;
