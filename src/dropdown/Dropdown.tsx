import { ReactNode } from 'react';
import styled from 'styled-components';
import DropdownProvider from './DropdownProvider';
import DropdownLabel from './DropdownLabel';
import DropdownItem from './DropdownItem';
import DropdownLine from './DropdownLine';
import DropdownList from './DropdownList';

interface Props {
    children: ReactNode;
}

const Dropdown = ({ children }: Props) => {
    return (
        <DropdownProvider>
            <StyledDropdown>{children}</StyledDropdown>
        </DropdownProvider>
    );
};

const StyledDropdown = styled.div`
    width: 130px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid var(--gray200);
    position: relative;
`;

export default Object.assign(Dropdown, {
    Button: DropdownLabel,
    Item: DropdownItem,
    Line: DropdownLine,
    List: DropdownList,
});
