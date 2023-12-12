export type ProblemType = 'MULTIPLE' | 'SUBJECTIVE';

export interface QuestionType {
  problemName: string;
  problemAnswer: string | null;
  problemCommentary: string;
  problemType: ProblemType;
  problemChoices: string[];
}
