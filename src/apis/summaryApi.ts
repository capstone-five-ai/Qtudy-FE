import { authClient, noAuthClient } from '@/apis/client';
import { GenerateUserSummaryOption } from '@/types/summary.type';

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

export const postSummaryByUser = async (
  newSummaryData: GenerateUserSummaryOption
) => {
  const response = await authClient.post(
    'api/member-saved-summary/new',
    newSummaryData
  );
  return response.data;
};
