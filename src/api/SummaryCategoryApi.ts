import apiClient from './client';

const QuizCategoryApi = {
  get: async (categorizedSummaryId: number) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 조회
    const response = await apiClient.get(`categorized-summary/${categorizedSummaryId}`);
    return response.data;
  },

  save: async (categoryIdList: number[], memberSavedSummaryId: number | null, aiGeneratedSummaryId: number | null) => {
    // 카테고리별 요약(Categorized Summary)/카테고리에 요약 저장
    const response = await apiClient.post('categorized-summary/new', {
      categoryIdList,
      memberSavedSummaryId,
      aiGeneratedSummaryId,
    });
    return response.data;
  },

  edit: async (categorizedSummaryId: number, summaryTitle: string, summaryContent: string) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 수정
    const response = await apiClient.patch(`categorized-summary/edit/${categorizedSummaryId}`, {
      summaryTitle,
      summaryContent,
    });
    return response.data;
  },

  delete: async (categorizedSummaryId: number) => {
    // 카테고리별 요약(Categorized Summary)/카테고리에 저장된 요약 삭제
    const response = await apiClient.delete(`categorized-summary/delete/${categorizedSummaryId}`);
    return response.data;
  },
};

export default QuizCategoryApi;
