import apiClient from './client';

const QuizCategoryApi = {
  get: async (categorizedProblemId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 조회
    const response = await apiClient.get(`categorized-problem/${categorizedProblemId}`);
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
    categorizedProblemId: number,
    problemName: string,
    problemAnswer: string,
    problemCommentary: string,
    problemChoices: string[]
  ) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 수정
    const response = await apiClient.patch(`categorized-problem/edit/${categorizedProblemId}`, {
      problemName,
      problemAnswer,
      problemCommentary,
      problemChoices,
    });
    return response.data;
  },

  delete: async (categorizedProblemId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리에 저장된 문제 삭제
    const response = await apiClient.delete(`categorized-problem/delete/${categorizedProblemId}`);
    return response.data;
  },

  downloadQuiz: async (categoryId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 PDF(문제) 다운
    apiClient.post(`api/categorized-problem/download-problem-pdf/${categoryId}`);
  },

  downloadAnswer: async (categoryId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 정답 PDF(정답) 다운
    await apiClient.post(`api/categorized-problem/download-answer-pdf/${categoryId}`);
  },
};

export default QuizCategoryApi;
