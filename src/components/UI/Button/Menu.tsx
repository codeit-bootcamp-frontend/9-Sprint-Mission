import Image from "next/image";
import kebab from "@/assets/images/icons/ic_kebab.svg";
import styled from "styled-components";

export function Menu() {
  return (
    <Container>
      <Image src={kebab} width={20} height={20} alt="menu button" />
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;
