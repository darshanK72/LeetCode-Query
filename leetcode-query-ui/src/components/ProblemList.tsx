import React, { useState, useCallback, useEffect } from 'react';
import { useProblemStore } from '../store/problemStore';
import { Check } from 'lucide-react';
import { Pagination } from './Pagination';

export function ProblemList() {
  const { filteredProblems, loading, error } = useProblemStore();
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('solvedProblems');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Save to localStorage whenever solvedProblems changes
  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify([...solvedProblems]));
  }, [solvedProblems]);

  // Reset to first page when filtered problems change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProblems]);

  // Memoize the toggle function
  const toggleSolved = useCallback((id: string) => {
    setSolvedProblems(prev => {
      const newSolved = new Set(prev);
      if (newSolved.has(id)) {
        newSolved.delete(id);
      } else {
        newSolved.add(id);
      }
      return newSolved;
    });
  }, []);

  // Memoize the checkbox render
  const renderCheckbox = useCallback((id: string) => {
    const isSolved = solvedProblems.has(id);
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleSolved(id);
        }}
        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-transform duration-100 ${
          isSolved
            ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600'
            : 'border-gray-300 dark:border-gray-500 hover:border-green-500 dark:hover:border-green-500'
        }`}
      >
        {isSolved && (
          <Check className="w-4 h-4 text-white" />
        )}
      </button>
    );
  }, [solvedProblems, toggleSolved]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Calculate pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageProblems = filteredProblems.slice(startIndex, endIndex);

  console.log('Filtered problems:', filteredProblems.length, filteredProblems);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1890ff] dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
      <div className="custom-scrollbar overflow-auto">
        <Pagination
          total={filteredProblems.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
        
        <div className="border-t dark:border-gray-700" />

        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                Solved
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[500px] max-w-[500px]">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">
                Acceptance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[300px] max-w-[300px]">
                Topics
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentPageProblems.map((problem, index) => (
              <tr key={problem.questionFrontendId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-4 py-4 text-gray-500 dark:text-gray-400 w-12">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-4 w-16">
                  <div className="flex items-center justify-center">
                    {renderCheckbox(problem.questionFrontendId)}
                  </div>
                </td>
                <td className="px-4 py-4 min-w-[500px] max-w-[600px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{problem.questionFrontendId}.</span>
                    <a 
                      href={`https://leetcode.com/problems/${problem.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1890ff] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 truncate"
                    >
                      {problem.title}
                    </a>
                    {problem.isPaidOnly && (
                      <span className="flex-shrink-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                        Premium
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 w-24">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-4 py-4 w-24">
                  <div className="text-sm text-gray-900 dark:text-gray-100">
                    {problem.acRate.toFixed(1)}%
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.topicTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}