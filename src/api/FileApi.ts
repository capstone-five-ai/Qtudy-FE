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
};

export default FileApi;
