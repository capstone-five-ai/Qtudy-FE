import { authClient } from '@/apis/client';
import { ServiceType } from '@/types/category.type';

export const downloadAIFile = async (fileId: number, pdfType: string) => {
  const response = await authClient.post(`api/file/downloadPdf/${fileId}`, {
    pdfType,
  });
  return response.data;
};

export const downloadUserSummaryFile = async (memberSavedSummaryId: number) => {
  // 사용자 요약정리 파일(file)/PDF 다운로드
  const response = await authClient.post(
    `api/member-saved-summary/download-pdf/${memberSavedSummaryId}`,
    null,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export const downloadCategoryProblemFile = async (categoryId: number) => {
  // 카테고리 문제 파일(file)/PDF 다운로드
  const response = await authClient.post(
    `api/categorized-problem/download-problem-pdf/${categoryId}`,
    null,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export const downloadCategoryAnswerFile = async (categoryId: number) => {
  // 카테고리 정답 파일(file)/PDF 다운로드
  const response = await authClient.post(
    `api/categorized-problem/download-answer-pdf/${categoryId}`,
    null,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export const downloadCategorySummaryFile = async (
  categorizedSummaryId: number
) => {
  // 카테고리 요약정리 파일(file)/PDF 다운로드
  const response = await authClient.post(
    `api/categorized-summary/download-pdf/${categorizedSummaryId}`,
    null,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};

export const updateFileName = async (fileId: number, newFileName: string) => {
  // 파일(file)/파일이름 업데이트
  const response = await authClient.patch(`api/file/updateFile/${fileId}`, {
    newFileName,
  });
  return response.data;
};

export const deleteFile = async (fileId: number) => {
  // 파일(file)/AI생성 파일 삭제
  const response = await authClient.delete(`api/file/deleteFile/${fileId}`);
  return response.data;
};

export const downloadQuiz = async (categoryId: number) => {
  // 카테고리별 문제(Categorized Problem)/카테고리별 문제 PDF(문제) 다운
  authClient.post(`api/categorized-problem/download-problem-pdf/${categoryId}`);
};

export const downloadAnswer = async (categoryId: number) => {
  // 카테고리별 문제(Categorized Problem)/카테고리별 정답 PDF(정답) 다운
  await authClient.post(
    `api/categorized-problem/download-answer-pdf/${categoryId}`
  );
};

export const downloadSummary = async (categoryId: number) => {
  // 카테고리별 요약(Categorized Summary)/카테고리별 요약 정리 PDF 다운
  await authClient.post(`api/categorized-summary/download-pdf/${categoryId}`);
};

export const checkDuplicateFileName = async (
  fileName: string,
  type: Extract<ServiceType, 'SUMMARY'> | 'PROBLEM'
) => {
  const response = await authClient.post(`/api/file/check-duplicate`, {
    fileName,
    type,
  });
  return response.data;
};
