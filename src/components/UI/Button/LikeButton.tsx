import Heart from "@/assets/images/icons/ic_heart.svg";
import styled from "styled-components";
import Image from "next/image";

export function LikeButton({ count }) {
  return (
    <Container>
      <Image src={Heart} width={28} height={28} alt="favorite icon" />
      <span>{count}</span>
    </Container>
  );
}

const Container = styled.button`
  width: 87px;
  height: 40px;
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--gray-100);
  border-radius: 35px;
  gap: 4px;
`;
