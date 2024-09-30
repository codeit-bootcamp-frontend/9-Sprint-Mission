import styled from 'styled-components';

const SIZE = {
    large: {
        fontSize: 20,
        width: 357,
        height: 56,
        radius: 40,
    },
    medium: {
        fontSize: 18,
        width: 240,
        height: 48,
        radius: 40,
    },
    small_42: {
        fontSize: 16,
        width: 88,
        height: 42,
        radius: 8,
    },
    small_48: {
        fontSize: 16,
        width: 88,
        height: 48,
        radius: 8,
    },
};

type SizeKey = keyof typeof SIZE;

const Button = styled.button<{ size: SizeKey }>`
    background-color: var(--blue);
    border: 0;
    color: var(--gray100);
    font-weight: 600;
    font-family: inherit;
    font-size: ${({ size }) => SIZE[size].fontSize}px;
    width: ${({ size }) => SIZE[size].width}px;
    height: ${({ size }) => SIZE[size].height}px;
    border-radius: ${({ size }) => SIZE[size].radius}px;

    &:hover {
        background-color: var(--blue-hover);
    }
    &:focus {
        background-color: var(--blue-focus);
    }
    &:disabled {
        background-color: var(--gray400);
    }
`;

export default Button;
