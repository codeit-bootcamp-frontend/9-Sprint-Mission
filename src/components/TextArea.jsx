import React from "react";
import styled from "styled-components";

const SIZE = {
    comment: {
        labelSize: 16,
        height: 104,
        mobile: 129,
    },
    addItem: {
        labelSize: 18,
        height: 282,
    },
};

const TextArea = ({
    children,
    size = "comment",
    placeholder,
    name,
    onChange,
}) => {
    return (
        <Label size={size}>
            {children}
            <StyledTextarea
                size={size}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </Label>
    );
};

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: ${({ size }) => SIZE[size].labelSize}px;
    font-weight: 700;
    color: var(--gray800);
    gap: 16px;
`;

const StyledTextarea = styled.textarea`
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
