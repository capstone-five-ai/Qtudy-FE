import getAccessToken from '../utils/getAccessToken';
import apiClient from './client';

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const QuizApi = {
  getAllAIQuiz: async (fileId: number, isAuthenticated: boolean) => {
    // AI생성문제(problem)/파일 전체문제 조회
    const response = await apiClient.get(`api/problem/getFileProblems/${fileId}`, isAuthenticated ? { headers } : {});
    return response.data;
  },

  getUserQuiz: async (memberSavedProblemId: number, isAuthenticated: boolean) => {
    // User생성문제(problem) 조회
    const response = await apiClient.get(
      `api/member-saved-problem/${memberSavedProblemId}`,
      isAuthenticated ? { headers } : {}
    );
    return response.data;
  },

  createByImage: async (amount: string, difficulty: string, fileName: string, type: string, file: FormData) => {
    // 문제파일(problemFile)/이미지 기반 요점정리 생성
    const response = await apiClient.post(
      'problemFile/generateProblemFileByImage',
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
    // 문제파일(problemFile)/PDF 기반 요점정리 생성
    const response = await apiClient.post(
      'problemFile/generateProblemFileByPdf',
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

  createByText: async (amount: string, difficulty: string, fileName: string, type: string, text: string) => {
    // 문제파일(problemFile)/Text 기반 요점정리 생성
    const response = await apiClient.post('summaryFile/generateSummaryFileByText', {
      amount,
      difficulty,
      fileName,
      type,
      text,
    });
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
    const response = await apiClient.post('member-saved-summary/new', {
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
