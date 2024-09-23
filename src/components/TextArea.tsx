import { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

const SIZE = {
    small: {
        labelSize: 16,
        height: 104,
        mobile: 129,
    },
    large: {
        labelSize: 18,
        height: 282,
        mobile: 129,
    },
};

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    size?: keyof typeof SIZE;
}

const TextArea = ({ label, size = "small", ...rest }: Props) => {
    return (
        <Label size={size}>
            {label}
            <StyledTextarea size={size} {...rest} />
        </Label>
    );
};

export const Label = styled.label<{ size: keyof typeof SIZE }>`
    display: flex;
    flex-direction: column;
    font-size: ${({ size }) => SIZE[size].labelSize}px;
    font-weight: 700;
    color: var(--gray800);
    gap: 16px;
`;

const StyledTextarea = styled.textarea<{ size: keyof typeof SIZE }>`
    border: 0;
    border-radius: 12px;
    background-color: var(--gray100);
    padding: 16px 24px;
    height: ${({ size }) => SIZE[size].height}px;
    resize: none;
    font-family: initial;
    color: var(--gray800);
    &::placeholder {
        color: var(--gray400);
    }
    @media (max-width: 767px) {
        height: ${({ size }) => SIZE[size].mobile}px;
    }
`;

export default TextArea;
