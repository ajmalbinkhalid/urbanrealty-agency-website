"use client";

import { useState } from "react";

type PaginationProps = {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  totalPages = 2,
  currentPage: initialPage = 1,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-[4px] font-jost font-medium text-[14px] transition-colors ${
            currentPage === page
              ? "bg-[#2C3A61] text-white"
              : "border border-[#E0E0E0] bg-white text-[#2C3A61] hover:bg-gray-100"
          }`}
          key={page}
          onClick={() => handlePageClick(page)}
          type="button"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
