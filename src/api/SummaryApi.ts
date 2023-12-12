import getAccessToken from '../utils/getAccessToken';
import { SummaryCreationByFileType, SummaryCreationByTextType, SummaryCreationByUserType } from '../types/summary.type';
import apiClient from './client';

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const SummaryApi = {
  getAISummary: async (fileId: number, isAuthenticated: boolean) => {
    const response = await apiClient.get(`api/summary/getSummary/${fileId}`, isAuthenticated ? { headers } : {});
    return response.data;
  },

  getUserSummary: async (memberSavedSummaryId: number, isAuthenticated: boolean) => {
    const response = await apiClient.get(
      `api/member-saved-summary/${memberSavedSummaryId}`,
      isAuthenticated ? { headers } : {}
    );
    return response.data;
  },

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

  createByUser: async ({ summaryTitle, summaryContent }: SummaryCreationByUserType) => {
    // 요약정리(Summary)/요약 정리 생성
    const response = await apiClient.post(
      'api/member-saved-summary/new',
      {
        summaryTitle,
        summaryContent,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return response.data;
  },
};

export default SummaryApi;
