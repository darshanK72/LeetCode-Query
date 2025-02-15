import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [
  { label: '10 / Page', value: '10' },
  { label: '20 / Page', value: '20' },
  { label: '50 / Page', value: '50' },
  { label: '100 / Page', value: '100' },
  { label: '200 / Page', value: '200' }
];

export function Pagination({ 
  total, 
  pageSize, 
  currentPage, 
  onPageChange, 
  onPageSizeChange 
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CustomDropdown
            value={pageSize.toString()}
            options={PAGE_SIZE_OPTIONS}
            onChange={(value) => onPageSizeChange(Number(value))}
            className="w-40"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {total} problems
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {Math.min((currentPage - 1) * pageSize + 1, total)}-{Math.min(currentPage * pageSize, total)} of {total}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isFirstPage}
            className={`p-2 rounded-md ${
              isFirstPage
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isLastPage}
            className={`p-2 rounded-md ${
              isLastPage
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 