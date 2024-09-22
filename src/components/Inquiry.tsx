import styled from "styled-components";

const InquirySection = styled.div`
  label {
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #111827;
  }

  textarea {
    margin-top: 9px;
    width: 100%;
    height: 104px;
    border: none;
    border-radius: 12px;
    background-color: #f3f4f6;
    padding: 16px 24px;
    resize: none;
    display: block;
  }
  textarea::placeholder {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color: #9ca3af;
    font-family: "Pretendard Variable", Pretendard;
  }

  @media only screen and (max-width: 768px) {
  textarea {
  height: 129px;
  }
  }
`;

function Inquiry() {
  return (
    <InquirySection>
      <label htmlFor="inquiry">문의하기</label>
      <textarea
        id="inquiry"
        name="inquiry"
        placeholder="개인정보를 공유하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      ></textarea>
    </InquirySection>
  );
}

export default Inquiry;
