import React, { useEffect, useState } from "react";
import { getProductsComments } from "../../../utils/api/api";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import styled from "styled-components";
import emptyImg from "../../../assets/img/emptyImg.svg";
import TextArea from "../../../components/TextArea";

const CommentList = () => {
    const { productId } = useParams();
    const [comments, setComments] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [comment, setComment] = useState("");

    // 댓글 입력 기능 미구현
    const handleSubmit = () => {
        console.log(comment);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await getProductsComments(productId, {
                limit: 10,
                cursor,
            });
            setComments(data.list);
            setCursor(data.nextCursor);
        };
        getData();
    }, [productId, cursor]);

    return (
        <Container>
            <div>
                <TextArea
                    size="comment"
                    placeholder={
                        "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                    }
                    name="comment"
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                >
                    문의하기
                </TextArea>
                <button
                    className="submitButton"
                    disabled={comment === ""}
                    onClick={handleSubmit}
                >
                    등록
                </button>
            </div>
            {comments.length === 0 ? (
                <div className="empty">
                    <img
                        className="emptyImg"
                        src={emptyImg}
                        alt="empty 이미지"
                    />
                    <p>아직 문의가 없어요</p>
                </div>
            ) : (
                comments.map((comment) => {
                    return <Comment key={comment.id} comment={comment} />;
                })
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 1200px;
    .submitButton {
        margin: 16px 0 0;
        float: right;
        width: 74px;
        padding: 12px 23px;
        background-color: var(--blue);
        color: var(--white);
        border: 0;
        border-radius: 8px;
        &:disabled {
            background-color: var(--gray400);
        }
    }
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        gap img {
            width: 196px;
        }
        p {
            font-size: 16px;
            color: var(--gray400);
        }
    }
    @media (max-width: 1200px) {
        width: 100%;
        .empty {
            img {
                width: 140px;
            }
        }
    }
`;

export default CommentList;
