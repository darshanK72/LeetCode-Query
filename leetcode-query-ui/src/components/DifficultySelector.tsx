import { Check } from 'lucide-react';

interface DifficultySelectorProps {
  values: string[];
  onChange: (values: string[]) => void;
}

const DIFFICULTIES = [
  { label: 'Easy', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
  { label: 'Medium', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' },
  { label: 'Hard', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' }
];

export function DifficultySelector({ values, onChange }: DifficultySelectorProps) {
  const toggleDifficulty = (difficulty: string) => {
    if (values.includes(difficulty)) {
      onChange(values.filter(d => d !== difficulty));
    } else {
      onChange([...values, difficulty]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="min-h-[38px] px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700">
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map(difficulty => (
            <div
              key={difficulty.label}
              onClick={() => toggleDifficulty(difficulty.label)}
              className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 ${
                values.includes(difficulty.label) ? difficulty.color : ''
              }`}
            >
              <div className="w-4 h-4 border dark:border-gray-500 rounded flex items-center justify-center">
                {values.includes(difficulty.label) && (
                  <Check className="w-3 h-3 text-gray-700 dark:text-gray-200" />
                )}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {difficulty.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 