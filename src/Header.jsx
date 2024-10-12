import pandaLogo from "./assets/image/pandaLogo.svg";
import profileImg from "./assets/image/profileImg.svg";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isItemPage = ["/items", "/additem"].includes(location.pathname);
  const isFreeboard = location.pathname === "/boards";

  return (
    <div className="flex items-center gap-8 Tablet:gap-5 Mobile:gap-2 px-4 Tablet:px-6 PC:px-[200px] mx-auto max-w-[1920px] w-full h-[70px] border-b border-[#DFDFDF">
      <div className="flex gap-[8.59px] ">
        <img
          className="w-10 h-10 Mobile:hidden"
          src={pandaLogo}
          alt="판다마켓 로고"
        />
        <h1 className="font-rokaf font-bold text-logo Mobile:text-logo-mobile self-end text-primary100">
          판다마켓
        </h1>
      </div>
      <div className="text-[#4B5563] flex grow font-bold text-2lg Mobile:text-lg font-pretendard gap-2">
        <Link to="/boards">
          <h2
            className={`${
              isFreeboard && "text-primary100"
            } px-[15px] Mobile:px-0`}
          >
            자유게시판
          </h2>
        </Link>
        <Link to="/items">
          <h2
            className={`${
              isItemPage && "text-primary100"
            } px-[15px] Mobile:px-0`}
          >
            중고마켓
          </h2>
        </Link>
      </div>
      <img className="w-10 h-10" src={profileImg} alt="유저 프로필 이미지" />
    </div>
  );
}
