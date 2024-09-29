import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useDropdownContext } from './DropdownProvider';

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const DropdownItem = ({ children, onClick }: Props) => {
    const { setIsOpen } = useDropdownContext();
    const handleClick = () => {
        onClick();
        setIsOpen((prev) => !prev);
    };
    return <StyledLi onClick={handleClick}>{children}</StyledLi>;
};

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 42px;
    list-style: none;
    font-size: 16px;
    color: var(--gray800);
`;

export default DropdownItem;
