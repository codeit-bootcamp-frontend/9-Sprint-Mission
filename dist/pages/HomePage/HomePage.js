import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import HomeHeader from "./conponents/HomeHeader";
import HomeBanner from "./conponents/HomeBanner";
import HomeTopImg from "../../assets/Img_home_top.png";
import HomeBottomImg from "../../assets/Img_home_bottom.png";
import HomeMainContent from "./conponents/HomeMainContent";
import HomeImg1 from "../../assets/Img_home_01.png";
import HomeImg2 from "../../assets/Img_home_02.png";
import HomeImg3 from "../../assets/Img_home_03.png";
import HomeFooter from "./conponents/HomeFooter";
const HomePage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(HomeHeader, {}), _jsx(HomeBanner, { src: HomeTopImg, text: _jsxs(_Fragment, { children: ["\uC77C\uC0C1\uC758 \uBAA8\uB4E0 \uBB3C\uAC74\uC744", _jsx("br", {}), " \uAC70\uB798\uD574 \uBCF4\uC138\uC694"] }), position: "top" }), _jsx(HomeMainContent, { src: HomeImg1, subtitle: "Hot Item", title: _jsxs("h2", { children: ["\uC778\uAE30 \uC0C1\uD488\uC744", _jsx("br", {}), "\uD655\uC778\uD574 \uBCF4\uC138\uC694"] }), content: _jsxs("p", { children: ["\uAC00\uC7A5 HOT\uD55C \uC911\uACE0\uAC70\uB798 \uBB3C\uD488\uC744", _jsx("br", {}), " \uD310\uB2E4 \uB9C8\uCF13\uC5D0\uC11C \uD655\uC778\uD574 \uBCF4\uC138\uC694"] }) }), _jsx(HomeMainContent, { src: HomeImg2, subtitle: "Search", title: _jsxs("h2", { children: ["\uAD6C\uB9E4\uB97C \uC6D0\uD558\uB294", _jsx("br", {}), "\uC0C1\uD488\uC744 \uAC80\uC0C9\uD558\uC138\uC694"] }), content: _jsxs("p", { children: ["\uAD6C\uB9E4\uD558\uACE0 \uC2F6\uC740 \uBB3C\uD488\uC740 \uAC80\uC0C9\uD574\uC11C", _jsx("br", {}), " \uC27D\uAC8C \uCC3E\uC544\uBCF4\uC138\uC694"] }) }), _jsx(HomeMainContent, { src: HomeImg3, subtitle: "Hot Item", title: _jsxs("h2", { children: ["\uD310\uB9E4\uB97C \uC6D0\uD558\uB294", _jsx("br", {}), "\uC0C1\uD488\uC744 \uB4F1\uB85D\uD558\uC138\uC694"] }), content: _jsxs("p", { children: ["\uC5B4\uB5A4 \uBB3C\uAC74\uC774\uB4E0 \uD310\uB9E4\uD558\uACE0 \uC2F6\uC740 \uC0C1\uD488\uC744", _jsx("br", {}), " \uC27D\uAC8C \uB4F1\uB85D\uD558\uC138\uC694"] }) }), _jsx(HomeBanner, { src: HomeBottomImg, text: _jsxs(_Fragment, { children: ["\uBBFF\uC744 \uC218 \uC788\uB294", _jsx("br", {}), " \uD310\uB2E4\uB9C8\uCF13 \uC911\uACE0 \uAC70\uB798"] }), position: "bottom" }), _jsx(HomeFooter, {})] }));
};
export default HomePage;
