import { CategoryQuizType } from '../types/quiz.type';
import apiClient from './client';

const QuizCategoryApi = {
  get: async (categorizedProblemId: string) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 조회
    const response = await apiClient.get(`api/categorized-problem/${categorizedProblemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  },

  save: async (categoryIdList: number[], memberSavedProblemId: number | null, aiGeneratedProblemId: number | null) => {
    // 카테고리별 문제(Categorized Problem)/카테고리에 문제 저장
    const response = await apiClient.post('categorized-problem/new', {
      categoryIdList,
      memberSavedProblemId,
      aiGeneratedProblemId,
    });
    return response.data;
  },

  edit: async (
    categorizedProblemId: string,
    { problemName, problemAnswer, problemCommentary, problemChoices }: CategoryQuizType
  ) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 수정
    const response = await apiClient.patch(
      `categorized-problem/edit/${categorizedProblemId}`,
      {
        problemName,
        problemAnswer,
        problemCommentary,
        problemChoices,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  },

  delete: async (categorizedProblemId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리에 저장된 문제 삭제
    const response = await apiClient.delete(`api/categorized-problem/delete/${categorizedProblemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  },
};

export default QuizCategoryApi;
