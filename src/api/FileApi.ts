import apiClient from './client';

const FileApi = {
  downloadFile: async (fileId: number, pdfType: string) => {
    // 파일(file)/PDF 다운로드
    const response = await apiClient.post(`file/downloadPdf/${fileId}`, { pdfType });
    return response.data;
  },

  updateFileName: async (fileId: number, newFileName: string) => {
    // 파일(file)/파일이름 업데이트
    const response = await apiClient.patch(`file/updateFile/${fileId}`, {
      newFileName,
    });
    return response.data;
  },

  deleteFile: async (fileId: number) => {
    // 파일(file)/AI생성 파일 삭제
    const response = await apiClient.delete(`file/deleteFile/${fileId}`);
    return response.data;
  },
};

export default FileApi;
