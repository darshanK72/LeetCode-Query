import { create } from 'zustand';
import type { Problem, ProblemResponse, QueryGroup } from '../types/problem';
import problemData from './db.json';

interface ProblemStore {
  problems: Problem[];
  filteredProblems: Problem[];
  totalProblems: number;
  loading: boolean;
  error: string | null;
  queryGroups: QueryGroup[];
  fetchProblems: () => void;
  setQueryGroups: (groups: QueryGroup[]) => void;
  applyFilters: () => void;
}

export const useProblemStore = create<ProblemStore>((set, get) => ({
  problems: [],
  filteredProblems: [],
  totalProblems: 0,
  loading: false,
  error: null,
  queryGroups: [],

  fetchProblems: () => {
    set({ loading: true, error: null });
    try {
      const response = problemData as ProblemResponse;
      set({
        problems: response.problemsetQuestionList,
        filteredProblems: response.problemsetQuestionList,
        totalProblems: response.totalQuestions,
        loading: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({ error: 'Failed to load problems', loading: false });
    }
  },

  setQueryGroups: (groups: QueryGroup[]) => {
    set({ queryGroups: groups });
    get().applyFilters();
  },

  applyFilters: () => {
    const { problems, queryGroups } = get();
    
    if (queryGroups.length === 0) {
      set({ filteredProblems: problems });
      return;
    }

    const filtered = problems.filter(problem => {
      return queryGroups.every(group => {
        return group.conditions.every(condition => {
          switch (condition.field) {
            case 'difficulty': {
              const allowedDifficulties = Array.isArray(condition.value) 
                ? condition.value 
                : [condition.value];
              
              return condition.operator === 'equals' 
                ? allowedDifficulties.includes(problem.difficulty)
                : false;
            }
            
            case 'topics': {
              const selectedTopics = Array.isArray(condition.value) 
                ? condition.value 
                : [condition.value];

              const problemTopicSlugs = problem.topicTags.map(tag => tag.slug);

              if (condition.operator === 'equals') {
                // For exact match:
                // 1. Problem should only have the selected topics
                // 2. Problem should have all or some of the selected topics
                // 3. Problem should not have any other topics
                return problemTopicSlugs.every(slug => selectedTopics.includes(slug)) && 
                       problemTopicSlugs.length > 0 &&
                       problemTopicSlugs.length <= selectedTopics.length;
              } else if (condition.operator === 'contains') {
                // For contains, the problem should have all the selected topics
                // (but can have other topics too)
                return selectedTopics.every(topic => 
                  problemTopicSlugs.includes(topic)
                );
              }
              return false;
            }

            case 'hasSolution':
              return condition.operator === 'equals' 
                ? problem.hasSolution === (condition.value === 'true')
                : false;
              
            default:
              return true;
          }
        });

        return group.operator === 'OR' ? true : !group.conditions.length;
      });
    });

    set({ filteredProblems: filtered });
  },
}));