import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 138px;
  border-bottom: 1px solid var(--gray-200);
  background-color: #fcfcfc;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    transition: transform 0.3s ease;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 20px;
  font-weight: 600;
`;

const ImageWrap = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
  background-color: white;
`;

const InfoWrap = styled.div`
  position: absolute;
  bottom: 14px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;

  & > span:first-child {
    color: #4b5563;
  }

  & > span:nth-of-type(2) {
    color: #9ca3af;
  }
`;

const likeCountBox = styled.div`
  position: absolute;
  bottom: 14px;
  right: 24px;
  display: flex;
  gap: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
`;

const S = {
  Container,
  Title,
  ImageWrap,
  InfoWrap,
  likeCountBox,
};

export default S;
