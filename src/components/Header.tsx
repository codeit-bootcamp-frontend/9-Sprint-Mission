import { Link, NavLink, useLocation } from "react-router-dom";
import logoIcon from "../assets/icon/logoIcon.svg";
import logoText from "../assets/icon/logoText.svg";
import profileIcon from "../assets/icon/profile.svg";
import styled from "styled-components";

const Header = () => {
    const location = useLocation();

    return (
        <StyledHeader>
            <LeftMenu>
                <Link className="logo" to="/">
                    <img className="logoIcon" src={logoIcon} alt="로고" />
                    <img className="logoText" src={logoText} alt="로고" />
                </Link>
                <StyledNavLink to="/" selected={location.pathname === "/"}>
                    자유게시판
                </StyledNavLink>
                <StyledNavLink
                    to="/items"
                    selected={
                        location.pathname === "/items" ||
                        location.pathname === "/additem"
                    }
                >
                    중고마켓
                </StyledNavLink>
            </LeftMenu>
            <NavLink to="/">
                <img src={profileIcon} alt="프로필 이미지" />
            </NavLink>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    padding: 0 200px;
    border-bottom: 1px solid #dfdfdf;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;

    @media (max-width: 1200px) {
        padding: 0 24px;
    }

    @media (max-width: 767px) {
        padding: 0 16px;
    }
`;

const LeftMenu = styled.div`
    display: flex;
    align-items: center;

    .logoText {
        display: none;
    }

    a {
        padding: 21px 15px;
        font-size: 18px;
        font-weight: 700;
        white-space: nowrap;
    }

    @media (max-width: 767px) {
        gap: 8px;

        .logoIcon {
            display: none;
        }

        .logoText {
            display: block;
        }

        a {
            font-size: 16px;
            padding: 0;
        }
    }
`;

const StyledNavLink = styled(NavLink)<{ selected: boolean }>`
    color: ${(props) => (props.selected ? "var(--blue)" : "var(--gray600)")};
`;

export default Header;
