import ArticleList from '@/src/board/ArticleList';
import BestArticleList from '@/src/board/BestArticleList';
import React from 'react';
import styled from 'styled-components';

const Boards = () => {
    return (
        <Contaniner>
            <BestArticleList />
            <ArticleList />
        </Contaniner>
    );
};

const Contaniner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px;
    gap: 40px;
`;

export default Boards;
