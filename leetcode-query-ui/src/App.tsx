import React, { useEffect } from 'react';
import { QueryBuilder } from './components/QueryBuilder';
import { ProblemList } from './components/ProblemList';
import { useProblemStore } from './store/problemStore';
import { useThemeStore } from './store/themeStore';
import { Code2, Moon, Sun } from 'lucide-react';

function App() {
  const { fetchProblems } = useProblemStore();
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-[#1890ff] dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LeetCode Query</h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <QueryBuilder />
          <ProblemList />
        </div>
      </main>
    </div>
  );
}

export default App;