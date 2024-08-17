import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 700;
    color: var(--gray800);
    gap: 16px;
`;

const Label = ({ children }) => {
    return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
