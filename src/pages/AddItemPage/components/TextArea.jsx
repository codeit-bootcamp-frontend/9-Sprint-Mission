import styled from "styled-components";

const TextArea = styled.textarea`
    border: 0;
    border-radius: 12px;
    background-color: var(--gray100);
    padding: 16px 24px;
    height: 282px;
    resize: none;
    font-family: initial;
    color: var(--gray800);
    &::placeholder {
        color: var(--gray400);
    }
`;

export default TextArea;
