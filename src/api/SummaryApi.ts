import { SummaryCreationByFileType, SummaryCreationByTextType } from '../types/summary.type';
import apiClient from './client';

const SummaryApi = {
  createByImage: async ({ option, file }: SummaryCreationByFileType) => {
    // 요점정리파일(summaryFile)/이미지 기반 요점정리 생성
    const response = await apiClient.post('api/summaryFile/generateSummaryFileByImage', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        amount: option.amount,
        fileName: option.fileName,
      },
    });
    return response.data;
  },

  createByPdf: async ({ option, file }: SummaryCreationByFileType) => {
    // 요점정리파일(summaryFile)/PDF 기반 요점정리 생성
    const response = await apiClient.post('api/summaryFile/generateSummaryFileByPdf', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        amount: option.amount,
        fileName: option.fileName,
      },
    });
    return response.data;
  },

  createByText: async ({ option, text }: SummaryCreationByTextType) => {
    // 요점정리파일(summaryFile)/Text 기반 요점정리 생성
    const response = await apiClient.post(
      'api/summaryFile/generateSummaryFileByText',
      {
        amount: option.amount,
        fileName: option.fileName,
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
