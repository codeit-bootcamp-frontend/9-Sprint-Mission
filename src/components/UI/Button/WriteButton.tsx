import Link from "next/link";
import styled from "styled-components";

const Button = styled.button`
  background-color: var(--blue);
  color: white;
  padding: 12px 23px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
`;

export default function NewArticleButton() {
  return (
    <Link href="/login/">
      <Button>글쓰기</Button>
    </Link>
  );
}
