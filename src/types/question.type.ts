export type ProblemType = 'MULTIPLE' | 'SUBJECTIVE';

export interface QuestionType {
  meberSavedProblemId?: number;
  aiGeneratedProblemId?: number;
  problemName: string;
  problemAnswer?: string;
  problemCommentary: string;
  problemType: ProblemType;
  problemChoices?: string[];
}
