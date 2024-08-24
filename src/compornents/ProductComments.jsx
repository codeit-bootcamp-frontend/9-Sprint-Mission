/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TimeAgo from "./TimeAgo";
import notCommonts from "../svg/notComments.svg";

export default function ProductComments({ comment }) {
  return (
    <>
      <div
        css={css({
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
        })}
      >
        <form
          css={css({
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          })}
        >
          <p
            css={css({
              color: "#4B5563",
              fontSize: "1.6rem",
              fontWeight: "600",
            })}
          >
            문의하기
          </p>
          <textarea
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            css={css({
              fontSize: "1.6rem",
              padding: "16px 24px",
              backgroundColor: "var(--color-gray100)",
              border: "none",
              borderRadius: "12px",
              height: "150px", // 고정된 높이 설정
              resize: "none", // 크기 조절 비활성화
            })}
          />
          <button
            css={css({
              color: "#fff",
              backgroundColor: "var(--color-blue)",
              fontSize: "1.6rem",
              fontWeight: "600",
              padding: "12px 23px",
              borderRadius: "8px",
              border: "none",
              width: "auto", // 버튼의 너비가 텍스트 크기에 맞게 조정되도록 설정
              marginLeft: "auto", // 버튼을 오른쪽에 정렬
            })}
          >
            등록
          </button>
        </form>
      </div>
      <div>
        {comment.length === 0 ? (
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            })}
          >
            <img src={notCommonts} alt="dfoks" />
            <p
              css={css({
                color: "#9CA3AF",
                fontSize: "1.6rem",
                fontWeight: "400",
              })}
            >
              아직 문의가 없어요
            </p>
          </div>
        ) : (
          comment.map((com) => (
            <form
              key={com.id}
              css={css({
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "4px",
                borderBottom: "1px solid #E5E7EB",
              })}
            >
              <div
                css={css({
                  display: "flex",
                })}
              >
                <p
                  css={css({
                    color: "#1F2937",
                    fontSize: "1.6rem",
                    fontWeight: "400",
                    flexGrow: "1",
                  })}
                >
                  {com.content}
                </p>
                <select>
                  <option>수정하기</option>
                  <option>삭제하기</option>
                </select>
              </div>

              <div
                css={css({
                  display: "flex",
                  gap: "8px",
                })}
              >
                <img
                  src={com.writer.image}
                  alt={`${com.writer.nickname}'의 아바타`}
                  css={css({
                    width: "32px",
                    height: "32px",
                  })}
                />
                <div
                  css={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  })}
                >
                  <p>{com.writer.nickname}</p>
                  <p>
                    <TimeAgo timestamp={com.createdAt} />
                  </p>
                </div>
              </div>
            </form>
          ))
        )}
      </div>
    </>
  );
}
