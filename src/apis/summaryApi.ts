import { authClient, noAuthClient } from '@/apis/client';
import {
  GenerateSummaryOption,
  GenerateUserSummaryOption,
} from '@/types/summary.type';

export const getAISummaryFile = async (
  fileId: number,
  isAuthenticated: boolean
) => {
  const path = `api/summary/getSummary/${fileId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const getUserSummaryItem = async (
  summaryId: number,
  isAuthenticated: boolean
) => {
  const path = `api/member-saved-summary/${summaryId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const postSummaryByText = async (
  option: GenerateSummaryOption,
  text: string
) => {
  const response = await authClient.post(
    'api/summaryFile/generateSummaryFileByText',
    {
      ...option,
      text,
    }
  );
  return response.data;
};

export const postSummaryByPdf = async (
  option: GenerateSummaryOption,
  file: FormData
) => {
  const response = await authClient.post(
    'api/summaryFile/generateSummaryFileByPdf',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...option },
    }
  );
  return response.data;
};

export const postSummaryByImage = async (
  option: GenerateSummaryOption,
  file: FormData
) => {
  const response = await authClient.post(
    'api/summaryFile/generateSummaryFileByImage',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...option },
    }
  );
  return response.data;
};

export const postSummaryByUser = async (
  newSummaryData: GenerateUserSummaryOption
) => {
  const response = await authClient.post(
    'api/member-saved-summary/new',
    newSummaryData
  );
  return response.data;
};
