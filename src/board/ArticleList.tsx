import { Article } from '@/types/types';
import { instance } from '@/util/api/axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArticleItem from './ArticleItem';
import Button from '../Button';

const ArticleList = () => {
    const [bestArticle, setBestArticle] = useState<Article[]>([]);

    useEffect(() => {
        const getData = async () => {
            const response = await instance.get(`/articles?pageSize=3&orderBy=like`);
            setBestArticle(response.data.list);
            console.log(response.data.list);
        };
        getData();
    }, []);
    return (
        <StyledArticles>
            <Title>
                <h2>게시글</h2>
                <Button size="small_42">글쓰기</Button>
            </Title>
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
`;

const Articles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export default ArticleList;
