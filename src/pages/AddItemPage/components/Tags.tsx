import styled from "styled-components";
import XIcon from "../../../assets/icon/X_Icon.svg";
import { MouseEvent } from "react";

interface Props {
    items: string[];
    onDelete: (item: string) => void;
}

const Tags = ({ items, onDelete }: Props) => {
    const handleDelete = (e: MouseEvent<HTMLButtonElement>, item: string) => {
        e.preventDefault();
        onDelete(item);
    };
    return (
        <StyledUl>
            {items.map((item, i) => (
                <StyledLi key={i}>
                    #{item}
                    <button onClick={(e) => handleDelete(e, item)}>
                        <img src={XIcon} alt="X" />
                    </button>
                </StyledLi>
            ))}
        </StyledUl>
    );
};

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

export default Tags;
