import { Image } from "next/image";
import { Article } from "@/types/articles";
import { LikeButton } from "@/components/UI/Button/LikeButton";
import Icon from "@/assets/images/icons/profilex1.png";

export function ArticleContent({
  title,
  content,
  image,
  likeCount,
  createdAt,
  writer,
}: Article) {

    const formmatedDate = 
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Image src={image || Icon} width={40} height={40} alt="profile" />
              <span>{writer.nickname}</span>
              <span>{formmatedDate}</span>
              <Divider/>
              <LikeButton count={likeCount} />
          </div>
          <div>{content}</div>
    </div>
  );
}
