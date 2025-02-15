export interface TopicTag {
  name: string;
  id: string;
  slug: string;
}

export interface Problem {
  acRate: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  freqBar: null | number;
  questionFrontendId: string;
  isFavor: boolean;
  isPaidOnly: boolean;
  status: null | string;
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
}

export interface ProblemResponse {
  totalQuestions: number;
  count: number;
  problemsetQuestionList: Problem[];
}

export interface QueryCondition {
  field: string;
  operator: string;
  value: string | string[];
}

export interface QueryGroup {
  conditions: QueryCondition[];
  operator: 'AND' | 'OR';
}