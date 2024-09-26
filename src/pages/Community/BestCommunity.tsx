import { Community } from "@/src/types/types";
import Image from "next/image";

const BestArticle = ({ articles }: { articles: Community[] }) => {
  console.log(articles);
  return (
    <section>
      <h2>베스트 게시글</h2>
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
    </section>
  );
};

export default BestArticle;
