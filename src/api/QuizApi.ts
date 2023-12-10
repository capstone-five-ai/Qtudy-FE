import { QuizCreationByTextType } from '../types/quiz.type';
import apiClient from './client';

const QuizApi = {
  getAllAIQuiz: async (fileId: number) => {
    // AI생성문제(problem)/파일 전체문제 조회
    const response = await apiClient.get(`api/problem/getFileProblems/${fileId}`);
    return response.data;
  },

  createByImage: async (amount: string, difficulty: string, fileName: string, type: string, file: FormData) => {
    // 문제파일(problemFile)/이미지 기반 AI 문제 생성
    const response = await apiClient.post(
      'api/problemFile/generateProblemFileByImage',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { amount, difficulty, fileName, type },
      }
    );
    return response.data;
  },

  createByPdf: async (amount: string, difficulty: string, fileName: string, type: string, file: FormData) => {
    // 문제파일(problemFile)/PDF 기반 AI 문제 생성
    const response = await apiClient.post(
      'api/problemFile/generateProblemFileByPdf',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { amount, difficulty, fileName, type },
      }
    );
    return response.data;
  },

  createByText: async ({ option, text }: QuizCreationByTextType) => {
    // 문제파일(problemFile)/Text 기반 AI 문제 생성
    const response = await apiClient.post(
      'api/problemFile/generateProblemFileByText',
      {
        amount: option.amount,
        difficulty: option.difficulty,
        fileName: option.fileName,
        type: option.type,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  },

  createByUser: async (
    problemName: string,
    problemAnswer: string,
    problemCommentary: string,
    problemType: string,
    problemChoices: string[]
  ) => {
    // 사용자 생성 문제(MemberSavedProblem)/문제 생성
    const response = await apiClient.post('api/member-saved-problem/new', {
      problemName,
      problemAnswer,
      problemCommentary,
      problemType,
      problemChoices,
    });
    return response.data;
  },
};

export default QuizApi;
