import apiClient from './client';

const SummaryApi = {
  getAISummary: async (fileId: number) => {
    const response = await apiClient.get(`api/summary/getSummary/${fileId}`);
    return response.data;
  },

  getUserSummary: async (memberSavedSummaryId: number) => {
    const response = await apiClient.get(`api/member-saved-summary/${memberSavedSummaryId}`);
    return response.data;
  },

  createByImage: async (amount: string, fileName: string, file: FormData) => {
    // 요점정리파일(summaryFile)/이미지 기반 요점정리 생성
    const response = await apiClient.post(
      'summaryFile/generateSummaryFileByImage',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { amount, fileName },
      }
    );
    return response.data;
  },

  createByPdf: async (amount: string, fileName: string, file: FormData) => {
    // 요점정리파일(summaryFile)/PDF 기반 요점정리 생성
    const response = await apiClient.post(
      'summaryFile/generateSummaryFileByPdf',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { amount, fileName },
      }
    );
    return response.data;
  },

  createByText: async (amount: string, fileName: string, text: string) => {
    // 요점정리파일(summaryFile)/Text 기반 요점정리 생성
    const response = await apiClient.post('summaryFile/generateSummaryFileByText', {
      amount,
      fileName,
      text,
    });
    return response.data;
  },

  createByUser: async (summaryTitle: string, summaryContent: string) => {
    // 요약정리(Summary)/요약 정리 생성
    const response = await apiClient.post('member-saved-summary/new', {
      summaryTitle,
      summaryContent,
    });
    return response.data;
  },
};

export default SummaryApi;
