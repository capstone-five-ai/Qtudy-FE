import { QuestionType } from '../types/question.type';
import { QuizCreationByFileType, QuizCreationByTextType } from '../types/quiz.type';
import apiClient, { noAuthClient } from './client';

const QuizApi = {
  getAllAIQuiz: async (fileId: number, isAuthenticated: boolean) => {
    // AI생성문제(problem)/파일 전체문제 조회
    const path = `api/problem/getFileProblems/${fileId}`;
    if (isAuthenticated) {
      const response = await apiClient.get(path);
      return response.data;
    }
    const response = await noAuthClient.get(path);
    return response.data;
  },

  getUserQuiz: async (memberSavedProblemId: number, isAuthenticated: boolean) => {
    // User생성문제(problem) 조회
    const path = `api/member-saved-problem/${memberSavedProblemId}`;
    if (isAuthenticated) {
      const response = await apiClient.get(path);
      return response.data;
    }
    const response = await noAuthClient.get(path);
    return response.data;
  },

  createByImage: async ({ option, file }: QuizCreationByFileType) => {
    // 문제파일(problemFile)/이미지 기반 AI 문제 생성
    const response = await apiClient.post('api/problemFile/generateProblemFileByImage', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        amount: option.amount,
        difficulty: option.difficulty,
        fileName: option.fileName,
        type: option.type,
      },
    });
    return response.data;
  },

  createByPdf: async ({ option, file }: QuizCreationByFileType) => {
    // 문제파일(problemFile)/PDF 기반 AI 문제 생성
    const response = await apiClient.post('api/problemFile/generateProblemFileByPdf', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        amount: option.amount,
        difficulty: option.difficulty,
        fileName: option.fileName,
        type: option.type,
      },
    });
    return response.data;
  },

  createByText: async ({ option, text }: QuizCreationByTextType) => {
    // 문제파일(problemFile)/Text 기반 AI 문제 생성
    const response = await apiClient.post('api/problemFile/generateProblemFileByText', {
      amount: option.amount,
      difficulty: option.difficulty,
      fileName: option.fileName,
      type: option.type,
      text,
    });
    return response.data;
  },

  createByUser: async (newQuiz: QuestionType) => {
    // 사용자 생성 문제(MemberSavedProblem)/문제 생성
    const response = await apiClient.post('api/member-saved-problem/new', newQuiz);
    return response.data;
  },
};

export default QuizApi;
