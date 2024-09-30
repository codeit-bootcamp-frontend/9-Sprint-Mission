import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Header = () => {
    const router = useRouter();

    return (
        <StyledHeader>
            <LeftMenu>
                <Logo href="/">
                    <Image src="/icon/logo_icon.svg" alt="로고" width={40} height={40} />
                    <h2>판다마켓</h2>
                </Logo>
                <StyledLink href={'/boards'} $isActive={router.pathname === '/boards'}>
                    자유게시판
                </StyledLink>
                <StyledLink href={'/items'} $isActive={router.pathname === '/items' || router.pathname === '/additem'}>
                    중고마켓
                </StyledLink>
            </LeftMenu>
            <Link href="/">
                <Image src="/icon/profile.svg" alt="프로필" width={40} height={40} />
            </Link>
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
    gap: 32px;
    h2 {
        font-size: 26px;
        font-weight: 700;
        color: var(--blue);
    }

    @media (max-width: 767px) {
        gap: 8px;
    }
`;

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    @media (max-width: 767px) {
        img {
            display: none;
        }
    }
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
    padding: 21px 0%;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
    color: ${({ $isActive }) => ($isActive ? 'var(--blue)' : 'var(--gray600)')};

    @media (max-width: 767px) {
        font-size: 16px;
        padding: 0;
    }
`;

export default Header;
