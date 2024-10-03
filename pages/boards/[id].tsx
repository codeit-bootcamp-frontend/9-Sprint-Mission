import { useRouter } from "next/router";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  return <div className="container">{id} 게시글 페이지</div>;
}
