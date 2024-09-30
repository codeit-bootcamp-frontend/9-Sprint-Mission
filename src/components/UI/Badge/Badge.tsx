import Medal from "@/assets/images/icons/ic_medal.png";
import Image from "next/image";
import S from "./Badge.style";

export function Badge() {
  return (
    <S.Container>
      <Image src={Medal} width={16} height={16} alt="/" />
      <span>Best</span>
    </S.Container>
  );
}

export default Badge;
