export interface QuestionType {
  meberSavedProblemId?: number;
  aiGeneratedProblemId?: number;
  problemName: string;
  problemAnswer: string | null;
  problemCommentary: string;
  problemType: 'MULTIPLE' | 'SUBJECTIVE';
  problemChoices: string[];
}
