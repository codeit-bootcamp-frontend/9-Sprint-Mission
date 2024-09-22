import styled from "styled-components";
import menuIcon from "../../../assets/icon/menuIcon.svg";
import timeAgo from "../../../utils/functions/timeAgo";
import { Comment } from "../../../utils/types/types";
import profileIcon from "../../../assets/icon/profile.svg";

interface Props {
    comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
    return (
        <StyledBox>
            <p className="content">{comment.content}</p>
            <button className="itemMenu">
                <img src={menuIcon} alt="메뉴 아이콘"></img>
            </button>
            <div className="profile">
                <img
                    src={comment.writer.image || profileIcon}
                    alt="프로필 이미지"
                />
                <div>
                    <p className="nickname">{comment.writer.nickname}</p>
                    <p className="date">{timeAgo(comment.updatedAt)}</p>
                </div>
            </div>
        </StyledBox>
    );
};

const StyledBox = styled.div`
    position: relative;
    padding: 0 0 12px;
    border-bottom: 1px solid var(--gray200);
    .content {
        font-size: 14px;
        color: var(--gray800);
    }
    .itemMenu {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 24px;
        background-color: var(--white);
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .profile {
        display: flex;
        margin: 24px 0 0;
        font-size: 12px;
        gap: 8px;
        img {
            width: 32px;
            height: 32px;
            object-fit: cover;
        }
        .nickname {
            color: var(--gray600);
        }
        .date {
            color: var(--gray400);
            margin: 4px 0 0;
        }
    }
    @media (max-width: 1200px) {
        width: 100%;
    }
`;

export default CommentItem;
