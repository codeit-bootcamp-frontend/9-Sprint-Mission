import { Community } from "@/src/types/types";
import Image from "next/image";

const AllCommunity = ({ articles }: { articles: Community[] }) => {
  console.log(articles);
  return (
    <ul>
      {articles?.map((article) => (
        <li key={article.id}>
          <div>{article.title}</div>
          <div>{article.writer.nickname}</div>
          <div>{article.updatedAt}</div>
          <div>{article.likeCount}</div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "300px",
            }}
          >
            {article.image ? (
              <Image
                src={article.image}
                fill
                alt={article.title}
                style={{
                  objectFit: "cover",
                }}
              />
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllCommunity;
