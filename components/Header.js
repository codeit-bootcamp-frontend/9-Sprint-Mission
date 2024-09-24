import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1 className="logo">
        <Link href="/">판다마켓</Link>
      </h1>
      <ul>
        <li>
          <Link href="/boards">자유게시판</Link>
        </li>
        <li>
          <Link href="/boards">중고마켓</Link>
        </li>
      </ul>
    </header>
  );
}
