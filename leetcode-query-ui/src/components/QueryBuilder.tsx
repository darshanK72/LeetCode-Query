import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import type { QueryCondition } from '../types/problem';
import { useProblemStore } from '../store/problemStore';
import { TopicSelector } from './TopicSelector';
import { CustomDropdown } from './CustomDropdown';
import { DifficultySelector } from './DifficultySelector';

const OPERATORS = {
  topics: [
    { label: 'Exactly Matches', value: 'equals' },
    { label: 'Contains', value: 'contains' }
  ]
};

const TOPICS = [
  'array',
  'string',
  'hash-table',
  'dynamic-programming',
  'math',
  'sorting',
  'greedy',
  'depth-first-search',
  'database',
  'binary-search',
  'matrix',
  'tree',
  'breadth-first-search',
  'bit-manipulation',
  'two-pointers',
  'prefix-sum',
  'heap-priority-queue',
  'binary-tree',
  'simulation',
  'stack',
  'graph',
  'counting',
  'sliding-window',
  'design',
  'enumeration',
  'backtracking',
  'union-find',
  'linked-list',
  'ordered-set',
  'number-theory',
  'monotonic-stack',
  'segment-tree',
  'trie',
  'bitmask',
  'combinatorics',
  'queue',
  'divide-and-conquer',
  'recursion',
  'memoization',
  'binary-indexed-tree',
  'geometry',
  'binary-search-tree',
  'hash-function',
  'string-matching',
  'topological-sort',
  'shortest-path',
  'rolling-hash',
  'game-theory',
  'interactive',
  'data-stream',
  'monotonic-queue',
  'brainteaser',
  'randomized',
  'merge-sort',
  'doubly-linked-list',
  'counting-sort',
  'iterator',
  'concurrency',
  'probability-and-statistics',
  'quickselect',
  'suffix-array',
  'bucket-sort',
  'minimum-spanning-tree',
  'line-sweep',
  'shell',
  'reservoir-sampling',
  'strongly-connected-component',
  'eulerian-circuit',
  'radix-sort',
  'rejection-sampling',
  'biconnected-component'
];

interface QueryState {
  difficulties: string[];
  topics: string[];
  topicOperator: string;
}

export function QueryBuilder() {
  const { setQueryGroups } = useProblemStore();
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);
  const [queryState, setQueryState] = useState<QueryState>({
    difficulties: ['Easy', 'Medium', 'Hard'],
    topics: [],
    topicOperator: 'equals'
  });

  const handleChange = (field: keyof QueryState, value: string | string[]) => {
    setQueryState(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnappliedChanges(true);
  };

  const resetTopics = () => {
    setQueryState(prev => ({
      ...prev,
      topics: []
    }));
    setHasUnappliedChanges(true);
  };

  const applyQuery = () => {
    const conditions: QueryCondition[] = [
      {
        field: 'difficulty',
        operator: 'equals',
        value: queryState.difficulties
      }
    ];

    if (queryState.topics.length > 0) {
      conditions.push({
        field: 'topics',
        operator: queryState.topicOperator,
        value: queryState.topics
      });
    }

    setQueryGroups([{
      operator: 'AND',
      conditions
    }]);
    setHasUnappliedChanges(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
          <Filter className="w-5 h-5" />
          Query Designer
        </h2>
      </div>

      <div className="space-y-4">
        {/* Difficulty Row */}
        <div className="flex gap-4 items-center">
          <div className="w-[200px] text-sm font-medium text-gray-600 dark:text-gray-300">
            Difficulty
          </div>
          <div className="flex-1">
            <DifficultySelector
              values={queryState.difficulties}
              onChange={(values) => handleChange('difficulties', values)}
            />
          </div>
        </div>

        {/* Topics Row */}
        <div className="flex gap-4 items-center">
          <div className="w-[200px] text-sm font-medium text-gray-600 dark:text-gray-300">
            Topics
          </div>
          <div className="w-[200px]">
            <CustomDropdown
              value={queryState.topicOperator}
              options={OPERATORS.topics}
              onChange={(value) => handleChange('topicOperator', value)}
            />
          </div>
          <div className="flex-1">
            <TopicSelector
              selectedTopics={queryState.topics}
              availableTopics={TOPICS.filter(topic => !queryState.topics.includes(topic))}
              onAddTopic={(topic) => handleChange('topics', [...queryState.topics, topic])}
              onRemoveTopic={(topic) => handleChange('topics', queryState.topics.filter(t => t !== topic))}
            />
          </div>
          <button
            onClick={resetTopics}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Reset Topics
          </button>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={applyQuery}
          disabled={!hasUnappliedChanges}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            hasUnappliedChanges 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Apply Query
        </button>
      </div>
    </div>
  );
}