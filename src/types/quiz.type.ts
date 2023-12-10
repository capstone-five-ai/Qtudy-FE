export interface QuizOptionType {
  type: string;
  amount: string;
  difficulty: string;
  fileName: string;
}

export interface QuizCreationByPdfType {
  option: QuizOptionType;
  file: FormData;
}

export interface QuizCreationByTextType {
  option: QuizOptionType;
  text: string;
}
