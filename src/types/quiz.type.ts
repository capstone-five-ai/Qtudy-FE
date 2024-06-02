export interface QuizType {
  problemName: string;
  problemChoices?: string[];
  problemAnswer?: string;
  problemCommentary: string;
}

export type GenerateQuizType = '객관식' | '주관식';

// AI 퀴즈 생성 요청 타입
export interface GenerateQuizOption {
  type: string;
  amount?: string;
  difficulty?: string;
  fileName?: string;
  isDuplicatedFileName?: boolean | null;
}

export interface ProblemsOfAIQuizFile extends QuizType {
  aiGeneratedProblemId: number;
}

export interface GenerateUserQuizOption extends QuizType {
  problemType: string;
}

export interface GenerateUserQuizItem extends GenerateUserQuizOption {
  problemId: number;
}

export interface AIQuizFile {
  problems: ProblemsOfAIQuizFile[];
  isWriter: boolean;
}

export interface UserQuizItem {
  response: GenerateUserQuizItem;
  isWriter: boolean;
}

export interface CategoryOtherQuizItem {
  categorizedProblemId: number;
  categorizedProblemName: string;
}
export interface CategoryQuizItem {
  categorizedProblemId: number;
  problemName: string;
  problemAnswer: string | null | undefined;
  problemCommentary: string;
  problemType: string;
  problemChoices: string[] | null | undefined;
  categoryName: string;
  categoryId: number;
  previousProblem: CategoryOtherQuizItem | null;
  nextProblem: CategoryOtherQuizItem | null;
}
