import { authClient } from '@/apis/client';

export const downloadAIQuizFile = async (fileId: number, pdfType: string) => {
  const response = await authClient.post(`api/file/downloadPdf/${fileId}`, {
    pdfType,
  });
  return response.data;
};
