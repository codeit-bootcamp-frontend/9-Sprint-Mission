import React from "react";
import { StyledLi, StyledUl } from "../../AddItemPage/components/Tags";

const Tags = ({ items }) => {
    return (
        <StyledUl>
            {items?.map((item, i) => (
                <StyledLi key={i}># {item}</StyledLi>
            ))}
        </StyledUl>
    );
};

export default Tags;
