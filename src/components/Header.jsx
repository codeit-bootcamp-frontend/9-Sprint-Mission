function Header() {
  return (
    <header>
      <a aria-label="홈으로 이동" href="/">
        <img src="images/logo/logo.svg" alt="판다마켓 로고" width="153" />
      </a>
      <a className="button" href="/login" id="loginLink">
        로그인
      </a>
    </header>
  );
}

export default Header;
