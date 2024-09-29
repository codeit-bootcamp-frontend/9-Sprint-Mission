import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useDropdownContext } from './DropdownProvider';

interface Props {
    children: ReactNode;
}

const DropdownItem = ({ children }: Props) => {
    const { setIsOpen } = useDropdownContext();
    return <StyledLi onClick={() => setIsOpen((prev) => !prev)}>{children}</StyledLi>;
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
