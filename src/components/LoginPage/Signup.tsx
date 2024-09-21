import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import loginGoogle from "../../assets/images/icon/login_google.svg";
import loginKakao from "../../assets/images/icon/login_kakao.svg";

const Signup = () => {
  return (
    <section className="login-wrap">
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="판다마켓" />
        </Link>
      </h1>

      <div className="content-wrap">
        <form action="./signin.html" method="POST" className="login-form">
          <div className="input-box">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              required
            />
            <span className="error email-error"></span>
          </div>
          <div className="input-box">
            <label htmlFor="name">닉네임</label>
            <input
              type="name"
              id="name"
              placeholder="닉네임을 입력해주세요"
              required
            />
            <span className="error name-error"></span>
          </div>
          <div className="input-box password-box">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrap">
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
              <button type="button" className="close-eyes"></button>
            </div>
            <span className="error password-error"></span>
          </div>
          <div className="input-box password-box">
            <label htmlFor="password-check">비밀번호 확인</label>
            <div className="input-wrap">
              <input
                type="password"
                id="password-check"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                required
              />
              <button type="button" className="close-eyes chk"></button>
            </div>
            <span className="error password-error-chk"></span>
          </div>
          <button type="submit" id="form-btn" className="btn" disabled>
            회원가입
          </button>
        </form>

        <div className="easy-login-wrap">
          <p>간편 로그인하기</p>
          <div className="login-icon">
            <Link to="https://www.google.com/" target="_blank">
              <img src={loginGoogle} alt="google" />
            </Link>
            <Link to="https://www.kakaocorp.com/page/" target="_blank">
              <img src={loginKakao} alt="kakao" />
            </Link>
          </div>
        </div>

        <div className="link-wrap">
          <p>이미 회원이신가요?</p>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
