import apiClient from './client';

const SummaryCategoryApi = {
  get: async (categorizedSummaryId: string) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 조회
    const response = await apiClient.get(`api/categorized-summary/${categorizedSummaryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  },

  save: async (categoryIdList: number[], memberSavedSummaryId: number | null, aiGeneratedSummaryId: number | null) => {
    // 카테고리별 요약(Categorized Summary)/카테고리에 요약 저장
    const response = await apiClient.post('api/categorized-summary/new', {
      categoryIdList,
      memberSavedSummaryId,
      aiGeneratedSummaryId,
    });
    return response.data;
  },

  edit: async (categorizedSummaryId: string, summaryTitle: string, summaryContent: string) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 수정
    const response = await apiClient.patch(`api/categorized-summary/edit/${categorizedSummaryId}`, {
      summaryTitle,
      summaryContent,
    });
    return response.data;
  },

  delete: async (categorizedSummaryId: number) => {
    // 카테고리별 요약(Categorized Summary)/카테고리에 저장된 요약 삭제
    const response = await apiClient.delete(`api/categorized-summary/delete/${categorizedSummaryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  },
};

export default SummaryCategoryApi;
