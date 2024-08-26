/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ProductComments from './ProductComments';
import backIcon from '../svg/backicon.svg'; // 아이콘 경로

const contentfont = css({
  color: '#4B5563',
  fontSize: '1.6rem',
});

export default function ProductDetailPresenter({ product, comment, onClick }) {
  return (
    <>
      <div
        css={css({
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        })}
      >
        <div
          css={css({
            display: 'flex',
            gap: '24px',
            width: '100%',
            paddingBottom: '40px',
            borderBottom: '1px solid #E5E7EB',
          })}
        >
          <div
            css={css({
              flex: '1 1 auto', // 이미지 컨테이너가 가능한 공간을 차지하도록 설정
              maxWidth: `calc(100% - 690px)`, // 옆의 고정된 690px에 맞게 이미지 크기 조정
            })}
          >
            <img
              src={product.images}
              alt={`${product.name}의 이미지`}
              css={css({
                width: '100%', // 이미지를 컨테이너의 너비에 맞게 설정
                height: 'auto', // 비율에 맞게 높이 자동 조정
                display: 'block',
                borderRadius: '16px',
              })}
            />
          </div>
          <div
            css={{
              minWidth: '690px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              css={css({
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid #E5E7EB',
                paddingBottom: '16px',
                gap: '16px',
              })}
            >
              <h2
                css={css({
                  fontSize: '2.4rem',
                  fontWeight: '600',
                })}
              >
                {product.name}
              </h2>
              <p
                css={css({
                  fontSize: '4rem',
                  fontWeight: '600',
                })}
              >
                {product.price.toLocaleString()}원
              </p>
            </div>
            <div
              css={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              })}
            >
              <p
                css={{
                  color: '#4B5563',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                }}
              >
                상품 소개
              </p>
              <p css={contentfont}>{product.description}</p>
              <p
                css={{
                  color: '#4B5563',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                }}
              >
                상품 태그
              </p>
              <div
                css={css({
                  color: '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.6rem',
                  fontWeight: '400',
                })}
              >
                {product.tags.map((tag, index) => (
                  <div
                    key={index}
                    css={css({
                      alignItems: 'center',
                      position: 'relative',
                      backgroundColor: 'var(--color-gray100)',
                      padding: '6px 12px',
                      borderRadius: '26px',
                    })}
                  >{`#${tag}`}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ProductComments comment={comment} />

        <button
          onClick={onClick} // 클릭 시 이전 페이지로 이동하는 함수 호출
          css={css({
            display: 'flex',
            alignItems: 'center',
            margin: '40px auto 0',
            color: '#fff',
            backgroundColor: 'var(--color-blue)',
            fontSize: '1.6rem',
            fontWeight: '600',
            padding: '12px 23px',
            borderRadius: '26px',
            border: 'none',
            textAlign: 'center',
            cursor: 'pointer',
          })}
        >
          목록으로 돌아가기
          <img
            src={backIcon}
            alt="뒤로가기 아이콘"
            css={css({
              marginLeft: '8px', // 텍스트와 아이콘 사이의 간격 조정
              width: '20px', // 이미지 크기 조정
              height: '20px',
            })}
          />
        </button>
      </div>
    </>
  );
}
