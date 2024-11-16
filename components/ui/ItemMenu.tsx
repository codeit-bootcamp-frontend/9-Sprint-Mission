import CommentDelete from "@/components/comments/CommentDelete";
import { CommentDeleteAtom, CommentEditAtom } from "@/atom/itemAtom";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

interface ItemMenuProps {
  menu1?: string;
  menu2?: string;
  id?: number;
  location: string;
}

const ItemMenu = ({ menu1, menu2, id, location }: ItemMenuProps) => {
  return <ItemMenuContainer menu1={menu1} menu2={menu2} id={id} location={location} />;
};

export default ItemMenu;

const ItemMenuContainer = ({ menu1, menu2, id, location }: ItemMenuProps) => {
  return (
    <motion.div
      className="absolute top-full right-0 mt-2 w-[139px] flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.05 }}
    >
      <ItemMenuUpper menu1={menu1} id={id} location={location} />
      <ItemMenuLower menu2={menu2} id={id} location={location} />
    </motion.div>
  );
};

const ItemMenuUpper = ({ menu1, id, location }: ItemMenuProps) => {
  const router = useRouter();
  const setCommentEdit = useSetAtom(CommentEditAtom);

  const handleClick = () => {
    if (location === "item") {
      router.push(`/items/${id}/edit`);
    } else {
      setCommentEdit((prev) => !prev);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center h-[46px] bg-white rounded-t-lg border-[1px] border-b-0 border-panda-gray300 hover:bg-panda-gray100 transition-colors text-panda-gray500"
    >
      {menu1}
    </button>
  );
};

const ItemMenuLower = ({ menu2, id, location }: ItemMenuProps) => {
  const [isDelete, setIsDelete] = useAtom(CommentDeleteAtom);
  const setCommentEdit = useSetAtom(CommentEditAtom);
  const switchLocation = () => {
    if (location !== "item" && id) {
      setIsDelete(true);
      setCommentEdit(false);
    } else {
      setIsDelete(false);
    }
  };

  return (
    <>
      <button
        onClick={switchLocation}
        className="w-full h-[46px] bg-white rounded-b-lg border-[1px] border-panda-gray300 hover:bg-panda-gray100 transition-colors text-panda-gray500"
      >
        {menu2}
      </button>
      {isDelete && id && (
        <div className="bg-panda-gray500/50 w-full min-h-full fixed top-0 left-0 z-30">
          <CommentDelete commentId={id} />
        </div>
      )}
    </>
  );
};
