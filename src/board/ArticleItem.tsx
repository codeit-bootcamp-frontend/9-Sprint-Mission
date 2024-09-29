import { Article } from '@/types/types';
import { formatDate } from '@/util/function/formatData';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
    item: Article;
}

const ArticleItem = ({ item }: Props) => {
    return (
        <StyledArticle>
            <ContentContainer>
                <p className="title">{item.title}</p>
                <ImageBox>
                    <Image src={item.image || 'img/default_item.svg'} alt="게시글 이미지" width={48} height={48} />
                </ImageBox>
            </ContentContainer>
            <ContentContainer>
                <Contents>
                    <Image src="/icon/profile.svg" alt="프로필" width={24} height={24} />
                    <p className="nickname">{item.writer.nickname}</p>
                    <p className="date">{formatDate(item.createdAt)}</p>
                </Contents>
                <Contents>
                    <Image src="/icon/heart.svg" alt="하트" width={24} height={24} />
                    <p className="like">{item.likeCount}</p>
                </Contents>
            </ContentContainer>
        </StyledArticle>
    );
};

const StyledArticle = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--gray150);
    border-bottom: 1px solid var(--gray200);
    padding-bottom: 24px;
    gap: 16px;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    .title {
        font-size: 20px;
        font-weight: 600;
        color: var(--gray800);
    }

    @media (max-width: 1200px) {
        .title {
            font-size: 18px;
        }
    }
    @media (max-width: 767px) {
        .title {
            font-size: 18px;
        }
    }
`;

const Contents = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    .nickname {
        color: var(--gray600);
    }
    .date {
        color: var(--gray400);
    }
    .like {
        font-size: 16px;
        color: var(--gray500);
    }
`;

export const ImageBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border: 1px solid var(--gray100);
    background-color: var(--white);
    border-radius: 8px;
`;

export default ArticleItem;
