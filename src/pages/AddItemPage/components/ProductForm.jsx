import React, { useState } from "react";
import styled from "styled-components";
import FileInput from "./FileInput";
import Input from "./Input";
import Label from "./Label";
import TextArea from "./TextArea";
import Tags from "./Tags";

const StyledForm = styled.form`
    width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;
        h2 {
            font-size: 20px;
            font-weight: 700;
        }
        button {
            padding: 12px 23px;
            background-color: var(--blue);
            color: var(--gray100);
            font-size: 16px;
            font-weight: 700;
            border: 0;
            border-radius: 8px;

            &:hover {
                background-color: var(--blue-hover);
            }
            &:focus {
                background-color: var(--blue-focus);
            }
            &:disabled {
                background-color: var(--gray400);
            }
        }
    }
`;

const INITIAL_VALUE = {
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: null,
};

const ProductForm = () => {
    const [value, setValue] = useState(INITIAL_VALUE);
    const [tagId, setTagId] = useState(0);

    const handleChange = (name, value) => {
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 테스트용
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(value);
    };

    // 태그 추가
    const onAddTag = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            e.preventDefault();
            const newTag = {
                name: e.target.value.trim(),
                id: tagId,
            };
            setTagId(tagId + 1);
            setValue((prev) => ({ ...prev, tags: [...value.tags, newTag] }));
            e.target.value = "";
        }
    };

    //태그 삭제
    const onDeleteTag = (id) => {
        const nextTags = value.tags.filter((item) => item.id !== id);
        setValue((prev) => ({ ...prev, tags: nextTags }));
    };

    const onDeleteImg = () => {
        console.log("ab");
        setValue((prev) => ({ ...prev, images: null }));
    };

    return (
        <StyledForm>
            <div className="title">
                <h2>상품 등록하기</h2>
                <button
                    disabled={
                        !(
                            value.name &&
                            value.price &&
                            value.description &&
                            value.tags
                        )
                    }
                    onClick={onSubmit}
                >
                    등록
                </button>
            </div>
            <FileInput
                value={value.images}
                onChange={handleChange}
                onDelete={onDeleteImg}
            >
                상품 이미지
            </FileInput>
            <Label>
                상품명
                <Input
                    placeholder="상품명을 입력해주세요"
                    name="name"
                    onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                    }}
                />
            </Label>
            <Label>
                상품 소개
                <TextArea
                    placeholder="상품 소개를 입력해주세요"
                    name="description"
                    onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                    }}
                />
            </Label>
            <Label>
                판매가격
                <Input
                    type="number"
                    placeholder="판매 가격을 입력해주세요"
                    name="price"
                    onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                    }}
                />
            </Label>
            <Label>
                태그
                <Input
                    placeholder="태그를 입력해주세요"
                    name="tags"
                    onKeyDown={onAddTag}
                />
                <Tags items={value.tags} onDelete={onDeleteTag} />
            </Label>
        </StyledForm>
    );
};

export default ProductForm;
