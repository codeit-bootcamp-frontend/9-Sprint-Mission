import { cls } from "@/lib/utils";
import Image from "next/image";
import toast from "react-hot-toast";

interface IProps {
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
}

const Pagination = ({ totalPage, page, setPage, isMobile }: IProps) => {
   // 다음페이지 데이터 가져오는 함수
   const onPageToNext = () => {
    const nextPage = page + 1;
    
    if (nextPage > totalPage) {
      setPage(totalPage);
      toast.error("마지막 페이지입니다.")
    } else {
      setPage(nextPage);
    }
  };

  // 이전페이지 데이터 가져오는 함수
  const onPageToPrev = () => {
    const prevPage = page - 1;
    setPage(prevPage);

    if (prevPage < 1) {
      setPage(1);
      toast.error("첫번째 페이지입니다.")
    } else {
      setPage(prevPage);
    }
  };

  // 각 페이지로 이동할 수 있도록 page를 바꾸는 함수
  const onClickPage = (i: number) => {
    setPage(i);
  };

  return (
    <div className="flex flex-col space-y-3 items-center justify-center pt-10">
      <div className="flex items-center space-x-1">
        <button className="pagination-number-round" onClick={onPageToPrev}>
          <Image src="/icons/arrowLeft.png" alt="왼쪽" width={16} height={16} />
        </button>
        {!isMobile ? (
          Array.from({ length: totalPage > 13 ? 13 : totalPage }, (_, i) => {
            const pageNumber = page > 13 ? i + 14 : i + 1;

            return (
              <button
                key={i}
                className={cls(
                  "pagination-number-round",
                  page === pageNumber ? "bg-[--color-theme] text-white" : ""
                )}
                onClick={() => onClickPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })
        ) : (
          <p className="pagination-number-round">{page}</p>
        )}
        <button className="pagination-number-round" onClick={onPageToNext}>
          <Image src="/icons/arrowRight.png" alt="오른쪽" width={16} height={16} />
        </button>
      </div>
      {isMobile && <span className="text-[--color-theme] text-sm animate-pulse md:hidden">화살표를 눌러 이동해주세요!</span>}
    </div>
  );
};

export default Pagination;
