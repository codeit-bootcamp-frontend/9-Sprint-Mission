import styled from "styled-components";

const Input = styled.input`
    border: 0;
    border-radius: 12px;
    background-color: var(--gray100);
    padding: 16px 24px;
    height: 56px;
    &::placeholder {
        color: var(--gray400);
    }
`;

export default Input;
