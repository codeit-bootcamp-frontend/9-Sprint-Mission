import styled from "styled-components";

interface Props {
    items: string[];
    onDelete?: () => void;
}

const Tags = ({ items }: Props) => {
    return (
        <StyledUl>
            {items?.map((item, i) => (
                <StyledLi key={i}># {item}</StyledLi>
            ))}
        </StyledUl>
    );
};

const StyledUl = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    list-style-type: none;
    color: var(--gray800);
`;

const StyledLi = styled.li`
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
