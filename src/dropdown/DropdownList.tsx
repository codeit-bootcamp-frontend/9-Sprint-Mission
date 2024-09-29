import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useDropdownContext } from './DropdownProvider';

interface Props {
    children: ReactNode;
}

const DropdownList = ({ children }: Props) => {
    const { isOpen } = useDropdownContext();
    return isOpen && <StyledUl>{children}</StyledUl>;
};

const StyledUl = styled.ul`
    width: 130px;
    background-color: var(--white);
    border-radius: 12px;
    border: 1px solid var(--gray200);
    position: absolute;
    top: 52px;
`;

export default DropdownList;
