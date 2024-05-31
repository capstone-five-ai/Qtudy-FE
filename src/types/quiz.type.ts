export interface GenerateQuizData {
  problemName: string; // 문제명
  problemAnswer: number; // 답안
  problemCommentary: string; // 해설
  problemChoices: string[]; // 선지
}

export type GenerateQuizType = '객관식' | '주관식';

// AI 퀴즈 생성 요청 타입
export interface GenerateAIQuizOption {
  type: string;
  amount: string;
  difficulty: string;
  fileName: string;
}

export interface ProblemsOfAIQuizFile {
  aiGeneratedProblemId: number;
  problemName: string;
  problemChoices: string[];
  problemAnswer: string | null;
  problemCommentary: string;
}

export interface AIQuizFile {
  problems: ProblemsOfAIQuizFile[];
  isWriter: boolean;
}
