import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  totalPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isMobile: boolean;
}

const Pagination = ({ totalPage, page, setPage, isMobile }: IProps) => {
  const maxButtons = 8;
  const [groupStart, setGroupStart] = useState(1);

  const lastGroupStart = Math.max(1, totalPage - maxButtons + 1);

  const handlePageToNext = () => {
    const nextPage = page + 1;

    if (nextPage > totalPage) {
      setPage(totalPage);
      toast.error("마지막 페이지입니다.");
    } else {
      setPage(nextPage);

      if (nextPage >= groupStart + maxButtons) {
        setGroupStart(Math.min(groupStart + maxButtons, lastGroupStart));
      }
    }
  };

  const handlePageToPrev = () => {
    const prevPage = page - 1;

    if (prevPage < 1) {
      setPage(1);
      toast.error("첫 페이지입니다.");
    } else {
      setPage(prevPage);

      if (prevPage < groupStart) {
        setGroupStart(Math.max(1, groupStart - maxButtons));
      }
    }
  };

  const handleClickPage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex flex-col space-y-3 items-center justify-center pt-10">
      <div className="flex items-center space-x-1">
        <button className="pagination-number-round" onClick={handlePageToPrev} disabled={page === 1}>
          <Image src="/icons/arrowLeft.png" alt="왼쪽" width={16} height={16} />
        </button>
        {isMobile ? (
          <p className="pagination-number-round">{page}</p>
        ) : (
          Array.from({ length: Math.min(maxButtons, totalPage - groupStart + 1) }, (_, i) => {
            const pageNumber = groupStart + i;

            return (
              <button
                key={i}
                className={`pagination-number-round ${
                  page === pageNumber ? "bg-panda-theme text-white" : ""
                }`}
                onClick={() => handleClickPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })
        )}
        <button className="pagination-number-round" onClick={handlePageToNext} disabled={page === totalPage}>
          <Image src="/icons/arrowRight.png" alt="오른쪽" width={16} height={16} />
        </button>
      </div>
      {isMobile && (
        <span className="text-panda-theme text-sm animate-pulse md:hidden">
          화살표를 눌러 이동해주세요!
        </span>
      )}
    </div>
  );
};

export default Pagination;
