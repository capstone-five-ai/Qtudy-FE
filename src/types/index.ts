export interface HeaderContentType {
  main: string;
  sub: string;
}

export interface TabType {
  tab: string;
  path: string;
}

export interface UploadedFileType {
  file: File;
  name: string;
}

export type QuizType = 'SUBJECTIVE' | 'MULTIPLE';

export interface CreateUserQuizInput {
  input: string;
  check: boolean;
}

// 카테고리 관련 타입
export type CategoryType = '퀴즈' | '요약';

export interface CategoryListInfoType {
  quiz: CategoryInfoType[];
  summary: CategoryInfoType[];
}

export interface CategoryInfoType {
  categoryId: number;
  categoryName: string;
}

export interface CategoryQuizItemsType {
  categorizedProblemId: number;
  problemGeneratedBy: string;
  problemType: QuizType;
  problemName: string;
  createTime: string;
  updateTime: string;
}

export interface CategorySummaryItemsType {
  categorizedSummaryId: number;
  summaryGeneratedBy: string;
  summaryTitle: string;
  summaryContent: string;
  createTime: string;
  updateTime: string;
}

export interface ErrorType {
  errorCode: string;
  errorMessage: string;
}
