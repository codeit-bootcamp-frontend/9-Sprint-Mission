interface Props {
  title: string;
  author: string;
  likes: number;
  date: string; // 부모 컴포넌트에서 date 포맷 변경해서 내려주기
}

export default function BestProduct({ title, author, likes, date }: Props) {
  return <div></div>;
}
