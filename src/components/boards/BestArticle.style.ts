import styled from "styled-components";

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 384px;
    height: 169px;
    border-radius: 8px;
    background-color: var(--gray-50);
  `,

  Title: styled.div`
    position: absolute;
    left: 24px;
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    line-height: 32px;
  `,

  ImageWrap: styled.div`
    position: absolute;
    right: 24px;
    width: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    border-radius: 6px;
    background-color: white;
  `,

  InfoWrap: styled.div`
    position: absolute;
    bottom: 12px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 24px;
    font-size: 14px;
    font-weight: 400x;
    color: #6b7280;

    & > span:nth-of-type(1) {
      margin-right: 8px;
    }
    & > span:nth-of-type(2) {
      margin-left: 4px;
    }
    & > span:last-child {
      margin-left: auto;
    }
  `,
};

export default S;
