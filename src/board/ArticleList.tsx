import { Article } from '@/types/types';
import { instance } from '@/util/api/axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArticleItem from './ArticleItem';
import Button from '../Button';
import SearchInput from '../SearchInput';
import Dropdown from '../dropdown/Dropdown';

const ArticleList = () => {
    const [bestArticle, setBestArticle] = useState<Article[]>([]);
    const [sort, setSort] = useState<string>('like');

    useEffect(() => {
        const getData = async () => {
            const response = await instance.get(`/articles?pageSize=3&orderBy=like`);
            setBestArticle(response.data.list);
        };
        getData();
    }, []);
    return (
        <StyledArticles>
            <Title>
                <h2>게시글</h2>
                <Button size="small_42">글쓰기</Button>
            </Title>
            <FlexBox>
                <SearchInput placeholder="검색할 상품을 입력해주세요" />
                <Dropdown>
                    <Dropdown.Button>최신순</Dropdown.Button>
                    <Dropdown.List>
                        <Dropdown.Item>최신순</Dropdown.Item>
                        <Dropdown.Item>좋아요순</Dropdown.Item>
                    </Dropdown.List>
                </Dropdown>
            </FlexBox>
            <Articles>
                {bestArticle.map((item) => (
                    <ArticleItem key={item.id} item={item} />
                ))}
            </Articles>
        </StyledArticles>
    );
};

const StyledArticles = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    gap: 24px;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-size: 20px;
        font-weight: 700;
        color: var(--gray900);
    }
    @media (max-width: 767px) {
        h2 {
            font-size: 18px;
        }
    }
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Articles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default ArticleList;
