import { KeyboardEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import FileInput from "./FileInput";
import Tags from "./Tags";
import TextArea from "../../../components/TextArea";
import Input from "../../../components/Input";

interface Product {
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: File | null;
}

const INITIAL_VALUE = {
    name: "",
    description: "",
    price: 0,
    tags: [],
    images: null,
};

const ProductForm = () => {
    const [value, setValue] = useState<Product>(INITIAL_VALUE);

    const handleChange = (
        name: string,
        value: string | number | File | null
    ): void => {
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 테스트용
    const onSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        console.log(value);
    };

    // 태그 추가
    const onAddTag = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter" && e.currentTarget.value.trim()) {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();

            setValue((prev) => ({
                ...prev,
                tags: [...new Set([...value.tags, newTag])],
            }));
            e.currentTarget.value = "";
        }
    };

    //태그 삭제
    const onDeleteTag = (name: string): void => {
        const nextTags = value.tags.filter((item) => item !== name);
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
                label="상품 이미지"
                value={value.images}
                onChange={handleChange}
                onDelete={onDeleteImg}
            />
            <Input
                label="상품명"
                placeholder="상품명을 입력해주세요"
                name="name"
                onChange={(e) => {
                    handleChange(e.target.name, e.target.value);
                }}
                inputSize="large"
            />
            <TextArea
                size="large"
                placeholder="상품 소개를 입력해주세요"
                name="description"
                onChange={(e) => {
                    handleChange(e.target.name, e.target.value);
                }}
                label="상품 소개"
            />
            <Input
                label="판매가격"
                type="number"
                placeholder="판매 가격을 입력해주세요"
                name="price"
                onChange={(e) => {
                    handleChange(e.target.name, e.target.value);
                }}
                inputSize="large"
            />
            <Input
                label="태그"
                placeholder="태그를 입력해주세요"
                name="tags"
                onKeyDown={onAddTag}
                inputSize="large"
            />
            <Tags items={value.tags} onDelete={onDeleteTag} />
        </StyledForm>
    );
};

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

export default ProductForm;
