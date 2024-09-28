import { Article } from '@/types/types';
import { instance } from '@/util/api/axios';
import GetPageSize from '@/util/hook/getPageSize';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BestArticleItem from './BestArticleItem';

const SIZE = {
    pc: 3,
    tablet: 2,
    mobile: 1,
};

const BestArticleList = () => {
    const [bestArticle, setBestArticle] = useState<Article[]>([]);
    const pageSize = SIZE[GetPageSize()];

    useEffect(() => {
        const getData = async () => {
            const response = await instance.get(`/articles?pageSize=${pageSize}&orderBy=like`);
            setBestArticle(response.data.list);
            console.log(response.data.list);
        };
        getData();
    }, [pageSize]);

    return (
        <StyledBestArticle>
            <h2>베스트 게시글</h2>
            <BestArticles>
                {bestArticle.map((item) => (
                    <BestArticleItem key={item.id} item={item} />
                ))}
            </BestArticles>
        </StyledBestArticle>
    );
};

const StyledBestArticle = styled.div`
    max-width: 1200px;
    width: 100%;
    h2 {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 24px;
    }
`;

const BestArticles = styled.div`
    width: 100%;
    gap: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export default BestArticleList;
