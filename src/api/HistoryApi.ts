import getAccessToken from '../utils/getAccessToken';
import apiClient from './client';

const config = {
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
};

const HistoryApi = {
  getQuizList: async (page: number) => {
    // 문제파일(problemFile)/생성 히스토리(문제)
    const response = await apiClient.get(`api/problemFile/searchAiProblemFileList/${page}`, config);
    return response.data;
  },

  getSummaryList: async (page: number) => {
    // 요점정리파일(summaryFile)/생성 히스토리(요점정리)
    const response = await apiClient.get(`api/summaryFile/searchAiSummaryFileList/${page}`, config);
    return response.data;
  },

  getSummaryDetail: async (id: number) => {
    // 요점정리(summary)/요점정리 조회
    const response = await apiClient.get(`api/summary/getSummary/${id}`, config);
    return response.data;
  },
};

export default HistoryApi;
