import styled from 'styled-components';

const SearchInput = styled.input`
    height: 42px;
    background-color: var(--gray100);
    border-radius: 12px;
    border: 0;
    color: var(--gray800);
    font-family: inherit;
    padding: 9px 44px;
    background-image: url('/icon/search.svg');
    background-repeat: no-repeat;
    background-position: 16px 50%;
    flex: 1;
    &::placeholder {
        color: var(--gray400);
    }
    &:focus {
        outline: 1px solid var(--blue);
    }
`;

export default SearchInput;
