import ArticleReply from "@/components/ArticleReply";
import ArticleView from "@/components/ArticleView";
import Button from "@/components/Button";
import SubmitBtn from "@/components/SubmitBtn";
import { TextInput } from "@/components/TextInput";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./id.module.css";
import Link from "next/link";
import axios from "@/lib/axios";
import { Article as ArticleType, Reply } from "@/types/types";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.["id"]; // nextjs 는 어떤 params가 있는지 모르기때문에 getStaticParams
  let Article;
  try {
    const ArticleRes = await axios.get(`/articles/${id}`);
    Article = ArticleRes.data;
  } catch (error) {
    console.error(error);
    return {
      notFound: false,
    };
  }

  let ArticleReplyData;
  try {
    const ArticleReplyRes = await axios.get(
      `/articles/${id}/comments?limit=10`
    );
    ArticleReplyData = ArticleReplyRes.data.list;
  } catch (error) {
    console.error(error);
    ArticleReplyData = [];
  }

  return {
    props: {
      ArticleItem: Article,
      ArticleReplyData: ArticleReplyData,
    },
  };
}

export default function Article({
  ArticleItem,
  ArticleReplyData,
}: {
  ArticleItem: ArticleType;
  ArticleReplyData: Reply[];
}) {
  const [replyValue, setReplyValue] = useState<string>("");
  const handleChangeReply = (e: ChangeEvent<HTMLInputElement>) => {
    const newReply = e.target.value;
    setReplyValue(newReply);
  };

  let active = replyValue !== "";

  const handleReplySubmit = (e: FormEvent<HTMLFormElement>) => {
    // 댓글 등록 api
  };
  return (
    <div className={`container ${styles.wrapper}`}>
      <ArticleView ArticleItem={ArticleItem} />
      <form className={styles.form} onSubmit={handleReplySubmit}>
        <TextInput
          label="reply"
          placeholder="댓글을 입력해주세요"
          required
          value={replyValue}
          onChange={handleChangeReply}
        >
          댓글 달기
        </TextInput>
        <div className={styles.SubmitBtn}>
          <SubmitBtn disabled={!active}>등록</SubmitBtn>
        </div>
      </form>
      <div className="article-reply">
        <ArticleReply ArticleReplyData={ArticleReplyData} />
      </div>
      <div className={styles["goback-btn"]}>
        <Link href="/boards">
          <Button>목록으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
