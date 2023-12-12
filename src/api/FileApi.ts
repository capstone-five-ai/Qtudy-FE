import getAccessToken from '../utils/getAccessToken';
import apiClient from './client';

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const FileApi = {
  downloadAIFile: async (fileId: number, pdfType: string) => {
    // 파일(file)/AI 문제, 정답 PDF 다운로드
    const response = await apiClient.post(`api/file/downloadPdf/${fileId}`, { pdfType }, { headers });
    return response.data;
  },

  downloadUserSummaryFile: async (memberSavedSummaryId: number) => {
    // 사용자 요약정리 파일(file)/PDF 다운로드
    const response = await apiClient.post(`api/member-saved-summary/download-pdf/${memberSavedSummaryId}`, null, {
      headers,
      responseType: 'blob',
    });
    return response.data;
  },

  downloadCategoryProblemFile: async (categoryId: number) => {
    // 카테고리 문제 파일(file)/PDF 다운로드
    const response = await apiClient.post(`api/categorized-problem/download-problem-pdf/${categoryId}`, null, {
      headers,
      responseType: 'blob',
    });
    return response.data;
  },

  downloadCategoryAnswerFile: async (categoryId: number) => {
    // 카테고리 정답 파일(file)/PDF 다운로드
    const response = await apiClient.post(`api/categorized-problem/download-answer-pdf/${categoryId}`, null, {
      headers,
      responseType: 'blob',
    });
    return response.data;
  },

  downloadCategorySummaryFile: async (categorizedSummaryId: number) => {
    // 카테고리 요약정리 파일(file)/PDF 다운로드
    const response = await apiClient.post(`api/categorized-summary/download-pdf/${categorizedSummaryId}`, null, {
      headers,
      responseType: 'blob',
    });
    return response.data;
  },

  updateFileName: async (fileId: number, newFileName: string) => {
    // 파일(file)/파일이름 업데이트
    const response = await apiClient.patch(
      `api/file/updateFile/${fileId}`,
      {
        newFileName,
      },
      {
        headers,
      }
    );
    return response.data;
  },

  deleteFile: async (fileId: number) => {
    // 파일(file)/AI생성 파일 삭제
    const response = await apiClient.delete(`api/file/deleteFile/${fileId}`, { headers });
    return response.data;
  },

  downloadQuiz: async (categoryId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 문제 PDF(문제) 다운
    apiClient.post(`api/categorized-problem/download-problem-pdf/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  downloadAnswer: async (categoryId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 정답 PDF(정답) 다운
    await apiClient.post(`api/categorized-problem/download-answer-pdf/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },

  downloadSummary: async (categoryId: number) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 정리 PDF 다운
    await apiClient.post(`api/categorized-summary/download-pdf/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  },
};

export default FileApi;
