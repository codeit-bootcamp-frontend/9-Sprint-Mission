import Image from "next/image";
import { CiHeart } from "react-icons/ci";

interface Props {
  title?: string;
  author?: string;
  likes?: number;
  date?: string; // 부모 컴포넌트에서 date 포맷 변경해서 내려주기
  imageSrc?: string;
}

export default function BestProductCard({
  title,
  author,
  likes,
  date,
  imageSrc,
}: Props) {
  return (
    <div>
      <div>
        <h1>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h1>
        <div>
          <Image src='' alt='게시글_이미지' />
        </div>
        <div>
          <div>
            <span>총명한 판다</span>
            <div>
              <CiHeart />
              <span>9999+</span>
            </div>
          </div>
          <span>2024.04.06</span>
        </div>
      </div>
    </div>
  );
}
