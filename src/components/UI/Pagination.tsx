// /components/UI/Pagination.tsx
import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
  pageSize: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  onPrevious,
  onNext,
  pageSize,
}) => {
  return (
    <div className='mt-8 flex justify-center'>
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-300'
      >
        이전
      </button>
      <button
        onClick={onNext}
        disabled={currentPage * pageSize >= totalCount}
        className='bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300'
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
