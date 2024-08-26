import React from "react";
import styled from "styled-components";
import XIcon from "../../../assets/icon/X_Icon.svg";

export const StyledUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    list-style-type: none;
    color: var(--gray800);
`;

export const StyledLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 26px;
    background-color: var(--gray100);
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    button {
        margin-left: 8px;
        border: 0;
        display: flex;
        align-items: center;
    }
`;

const Tag = ({ item, onDelete }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(item.id);
    };
    return (
        <StyledLi>
            #{item.name}
            <button onClick={handleDelete}>
                <img src={XIcon} alt="X" />
            </button>
        </StyledLi>
    );
};

const Tags = ({ items, onDelete }) => {
    return (
        <StyledUl>
            {items.map((item) => {
                return <Tag key={item.id} item={item} onDelete={onDelete} />;
            })}
        </StyledUl>
    );
};

export default Tags;
