export interface QuestionType {
  problemName: string;
  problemAnswer: string;
  problemCommentary: string;
  problemType: 'MULTIPLE' | 'SUBJECTIVE';
  problemChoices?: string[];
}
