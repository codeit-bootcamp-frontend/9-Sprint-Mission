import Image from "next/image";

const PostList = () => {
  return (
    <div className="flex flex-col space-y-6">
      {[1, 2, 3].map((item, i) => (
        <div key={i} className="flex flex-col space-y-4 bg-[#FCFCFC] pb-6 border-b-[1px] border-[--color-gray200]">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold w-[263px] md:w-[616px]">
              맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
            </p>
            <div className="bg-white w-[72px] h-[72px] flex items-center justify-center rounded-lg border-[0.75px] border-[--color-gray200]">
              <Image src="/images/laptop.png" alt="랩톱" width={48} height={48} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/icons/sessionBtn.png" alt="회원프로필" width={24} height={24} />
              <div className="flex items-center space-x-2">
                <h3 className="text-sm text-[#4B5563]">총명한 판다</h3>
                <span className="text-sm text-[--color-gray400]">2024. 04. 16</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/icons/ic_heart.svg" alt="좋아요" width={24} height={24} />
              <span className="text-[--color-gray500]">9999+</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
