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
