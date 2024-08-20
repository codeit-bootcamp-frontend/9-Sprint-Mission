import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import loginGoogle from '../../assets/images/icon/login_google.svg';
import loginKakao from '../../assets/images/icon/login_kakao.svg';

const Login = () => {
  return (
    <section className="login-wrap">
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="판다마켓" />
        </Link>
      </h1>

      <div className="content-wrap">
        <form action="./items.html" method="POST" className="login-form">
          <div className="input-box">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" autocomplete="off" placeholder="이메일을 입력해주세요" required />
            <span className="error email-error"></span>
          </div>
          <div className="input-box password-box">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrap">
              <input type="password" id="password" autocomplete="off" placeholder="비밀번호를 입력해주세요" required />
              <button type="button" className="close-eyes"></button>
            </div>
            <span className="error password-error"></span>
          </div>
          <button type="submit" id="form-btn" className="btn" disabled>
            로그인
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
          <p>판다마켓이 처음이신가요?</p>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
