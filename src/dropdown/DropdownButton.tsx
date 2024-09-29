import { ReactNode } from 'react';
import { useDropdownContext } from './DropdownProvider';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
    children: ReactNode;
}

const DropdownButton = ({ children }: Props) => {
    const { setIsOpen } = useDropdownContext();
    return (
        <StyledButton onClick={() => setIsOpen((prev) => !prev)}>
            {children}
            <Image src="icon/arrow_down.svg" alt="화살표" width={24} height={24} />
        </StyledButton>
    );
};

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: 0;
    background-color: var(--white);
    font-size: 16px;
    font-family: inherit;
    color: var(--gray800);
`;

export default DropdownButton;
