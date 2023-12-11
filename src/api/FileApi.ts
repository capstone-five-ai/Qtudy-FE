import getAccessToken from '../utils/getAccessToken';
import apiClient from './client';

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const FileApi = {
  downloadFile: async (fileId: number, pdfType: string) => {
    // 파일(file)/PDF 다운로드
    const response = await apiClient.post(`api/file/downloadPdf/${fileId}`, { pdfType }, { headers });
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
    apiClient.post(`api/categorized-problem/download-problem-pdf/${categoryId}`);
  },

  downloadAnswer: async (categoryId: number) => {
    // 카테고리별 문제(Categorized Problem)/카테고리별 정답 PDF(정답) 다운
    await apiClient.post(`api/categorized-problem/download-answer-pdf/${categoryId}`);
  },

  downloadSummary: async (categoryId: number) => {
    // 카테고리별 요약(Categorized Summary)/카테고리별 요약 정리 PDF 다운
    await apiClient.post(`api/categorized-summary/download-pdf/${categoryId}`);
  },
};

export default FileApi;
