import styled from "styled-components";
import Image from "next/image";
import backIcon from "@/assets/images/icons/ic_back.svg";

export default function GoBackButton() {
  return (
    <Button onClick={() => window.history.back()}>
      <span>목록으로 돌아가기</span>
      <div>
        <Image src={backIcon} width={24} height={24} alt="goback icon" />
      </div>
    </Button>
  );
}

// 스타일 컴포넌트
const Button = styled.button`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 12px 64px;
  border-radius: 40px;
  background-color: var(--blue);
  line-height: 26px;
  font-size: 18px;
  color: white;

  & > span {
    width: 129px;
    height: 26px;
    flex-shrink: 0;
  }
`;
