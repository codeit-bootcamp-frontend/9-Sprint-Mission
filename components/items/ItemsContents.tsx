import { cls } from "@/lib/utils";
import { IItemList } from "@/types/itemsTypeShare";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  itemList: IItemList["list"];
  imgSize: number;
  kind: string;
}

const ItemsContents = ({ itemList, imgSize, kind }: IProps) => {
  return itemList.map((item) => (
    <Link href={`/items/${item.id}`} key={item.id} className="flex flex-col space-y-4">
      <Image
        src={item.images[0] || "/icons/question.png"}
        alt="제품목록"
        width={imgSize}
        height={imgSize}
        loading="lazy"
        className={cls(
          "object-cover w-full",
          kind === "best"
            ? "rounded-2xl h-[343px]"
            : "h-[168px] rounded-xl md:w-[221px] md:rounded-2xl"
        )}
      />
      <div className="flex flex-col space-y-2">
        <h2 className="text-sm font-medium">{item.name}</h2>
        <span className="font-bold">{item.price.toLocaleString("ko-KR")}원</span>
        <div className="flex items-center space-x-1">
          <Image src="/icons/ic_heart.svg" alt="좋아요" width={13} height={13} />
          <span className="text-xs font-medium text-[#4B5563]">{item.favoriteCount}</span>
        </div>
      </div>
    </Link>
  ));
};

export default ItemsContents;
