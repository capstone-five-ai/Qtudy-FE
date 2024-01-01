import { QuizType } from '.';

export interface QuizOptionType {
  type: string;
  amount: string;
  difficulty: string;
  fileName: string;
}

export interface QuizCreationByFileType {
  option: QuizOptionType;
  file: FormData;
}

export interface QuizCreationByTextType {
  option: QuizOptionType;
  text: string;
}

export interface CategoryQuizItemsType {
  categorizedProblemId: number;
  problemGeneratedBy: string;
  problemType: QuizType;
  problemName: string;
  createTime: string;
  updateTime: string;
}

export interface CategoryQuizType {
  problemName: string;
  problemAnswer?: string;
  problemCommentary: string;
  problemChoices?: string[];
}

export interface CateogorizedOtherQuiz {
  categorizedProblemId: number;
  categorizedProblemName: string;
}
