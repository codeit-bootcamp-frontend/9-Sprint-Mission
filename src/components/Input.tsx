import styled from "styled-components";
import { Label } from "./TextArea";
import { InputHTMLAttributes } from "react";

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

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputSize?: keyof typeof SIZE;
}

const Input = ({ label, inputSize = "small", ...rest }: Props) => {
    return (
        <Label size={inputSize}>
            {label}
            <StyledInput inputSize={inputSize} {...rest} />
        </Label>
    );
};

const StyledInput = styled.input<{ inputSize: keyof typeof SIZE }>`
    border: 0;
    border-radius: 12px;
    background-color: var(--gray100);
    padding: 16px 24px;
    height: 56px;
    &::placeholder {
        color: var(--gray400);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default Input;
