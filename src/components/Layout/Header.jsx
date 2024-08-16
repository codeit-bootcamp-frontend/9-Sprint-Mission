import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo/logo.svg";
import "./Header.css";

function getLinkStyle({ isActive }) { //get함수는 NavLink와 같이 쓰는 함수
	return { color: isActive  ? "var(--blue" : undefined };
}//아래 자유게시판,중고마켓의 스타일을 isActive의 true,false값으로 활성,비활성화하는 함수

function Header() {
	return (
		<header className="globalHeader">
			<div className="headerLeft">
				<Link to="/" className="headerLogo" aria-label="홈으로 이동">
					<img src={Logo} alt="판다마켓 로고" width="153" />
				</Link>
				{/* aria-label은 스크린 리더가 읽게 하기 위한 접근성을 위한 코드  */}

				<nav>
					<ul>
						<li>
							<NavLink to="/community" style={getLinkStyle}>
								자유게시판
							</NavLink>
						</li>
						<li>
							<NavLink to="/items" style={getLinkStyle}>
								중고마켓
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>

			<Link to="/login" className="loginLink button">
				로그인
			</Link>
		</header>
	);
}

export default Header;