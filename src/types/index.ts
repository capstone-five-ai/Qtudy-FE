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

export interface UserQuizInputType {
  id: string;
  input: string;
  check: boolean;
}

// 카테고리 관련 타입
export type CategoryType = '퀴즈' | '요약';

export interface CategoryInfoType {
  categoryId: number;
  categoryName: string;
  categoryType: string;
}

export interface ErrorType {
  errorCode: string;
  errorMessage: string;
}
