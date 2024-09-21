import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import icFacebook from "../assets/images/icon/ic_facebook.svg";
import icTwitter from "../assets/images/icon/ic_twitter.svg";
import icInstagram from "../assets/images/icon/ic_instagram.svg";
import icYoutube from "../assets/images/icon/ic_youtube.svg";
const Footer = () => {
    return (_jsx("footer", { children: _jsxs("div", { className: "footer-wrap", children: [_jsx("p", { children: "\u00A9codeit - 2024" }), _jsxs("div", { className: "footer-btn", children: [_jsx(Link, { to: "./privacy.html", children: "Privacy Policy" }), _jsx(Link, { to: "./faq.html", children: "FAQ" })] }), _jsxs("div", { className: "footer-icon", children: [_jsx(Link, { to: "https://www.facebook.com/", children: _jsx("img", { src: icFacebook, alt: "facebook" }) }), _jsx(Link, { to: "https://x.com/", children: _jsx("img", { src: icTwitter, alt: "twitter" }) }), _jsx(Link, { to: "https://www.instagram.com/", children: _jsx("img", { src: icInstagram, alt: "instagram" }) }), _jsx(Link, { to: "https://www.youtube.com/", children: _jsx("img", { src: icYoutube, alt: "youtube" }) })] })] }) }));
};
export default Footer;
