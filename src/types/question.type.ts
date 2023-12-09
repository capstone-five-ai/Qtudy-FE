export interface QuestionType {
  problemName: string;
  problemAnswer: string | null;
  problemCommentary: string;
  problemType: 'MULTIPLE' | 'SUBJECTIVE';
  problemChoices: string[];
}
