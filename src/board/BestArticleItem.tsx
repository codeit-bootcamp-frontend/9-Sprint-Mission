import { Article } from '@/types/types';
import { formatDate } from '@/util/function/formatData';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { ImageBox } from './ArticleItem';

interface Props {
    item: Article;
}

const BestArticleItem = ({ item }: Props) => {
    return (
        <StyledBestArticle>
            <TopBanner>
                <Image src="/icon/medal.svg" alt="메달" width={16} height={16} />
                <p>Best</p>
            </TopBanner>
            <Contents>
                <p className="title">{item.title}</p>
                <ImageBox>
                    <Image src={item.image || 'img/default_item.svg'} alt="게시글 이미지" width={48} height={48} />
                </ImageBox>
            </Contents>
            <BottomBanner>
                <div className="left">
                    <p className="nickname">{item.writer.nickname}</p>
                    <div className="like">
                        <Image src="/icon/heart.svg" alt="하트" width={16} height={16} />
                        <p className="likeCount">{item.likeCount}</p>
                    </div>
                </div>
                <p className="date">{formatDate(item.createdAt)}</p>
            </BottomBanner>
        </StyledBestArticle>
    );
};

const StyledBestArticle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-color: var(--gray50);
    border-radius: 8px;
    padding: 0 24px 16px;
`;

const TopBanner = styled.div`
    display: flex;
    gap: 4px;
    background-color: var(--blue);
    align-items: center;
    justify-content: center;
    width: 102px;
    height: 30px;
    border-radius: 0 0 16px 16px;
    p {
        color: var(--white);
        font-size: 16px;
        font-weight: 600;
    }
`;

const Contents = styled.div`
    display: flex;
    justify-content: space-between;
    .title {
        color: var(--gray800);
        font-size: 20px;
        font-weight: 600;
    }
`;

const BottomBanner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .left {
        display: flex;
        gap: 8px;
        .nickname {
            color: var(--gray600);
        }
        .like {
            gap: 4px;
            display: flex;
            align-items: center;
            .likeCount {
                color: var(--gray500);
            }
            .date {
                color: var(--gray400);
            }
        }
    }
`;

export default BestArticleItem;
