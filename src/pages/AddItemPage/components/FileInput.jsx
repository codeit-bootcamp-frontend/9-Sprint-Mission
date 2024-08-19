import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import plusIcon from "../../../assets/icon/plus.svg";
import XIcon from "../../../assets/icon/X_Icon.svg";

const StyledFileInput = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: 700;
    color: var(--gray800);
    gap: 16px;
    p {
        color: var(--red-error);
        font-size: 16px;
        font-weight: 400;
    }
`;

const ImgInputBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    width: 50%;
    position: relative;
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background-color: var(--gray100);
        border-radius: 12px;
        font-size: 16px;
        font-weight: 400;
        color: var(--gray400);
        width: 100%;
        aspect-ratio: 1/1;
    }
    input {
        display: none;
    }
    .prevImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
    }
    button {
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
        border: 0;
        top: 12px;
        right: 12px;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`;

const FileInput = ({ children, value, onChange, onDelete }) => {
    const [prevImg, setPrevImg] = useState();
    const inputRef = useRef();

    const handleFileChange = (e) => {
        onChange(e.target.name, e.target.files[0]);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete();
    };

    useEffect(() => {
        if (!value) return;
        const objectURL = URL.createObjectURL(value);
        setPrevImg(objectURL);

        return () => {
            setPrevImg();
            URL.revokeObjectURL(objectURL);
        };
    }, [value]);

    return (
        <StyledFileInput>
            {children}
            <ImgInputBox>
                <label>
                    <img src={plusIcon} alt="플러스 아이콘" />
                    이미지 등록
                    <input
                        type="file"
                        name="images"
                        onChange={handleFileChange}
                        ref={inputRef}
                    />
                </label>
                {value && (
                    <>
                        <img
                            className="prevImg"
                            src={prevImg}
                            alt="이미지 미리보기"
                        />
                        <button onClick={handleDelete}>
                            <img src={XIcon} alt="X" />
                        </button>
                    </>
                )}
            </ImgInputBox>
            {value && <p>* 이미지 등록은 최대 1개까지 가능합니다.</p>}
        </StyledFileInput>
    );
};

export default FileInput;
