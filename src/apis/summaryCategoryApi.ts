import { authClient, noAuthClient } from '@/apis/client';

export const postSummaryToCategory = async (
  categoryIdList: number[],
  summaryId: number
) => {
  const response = await authClient.post('api/categorized-summary/new', {
    categoryIdList: categoryIdList,
    summaryId: summaryId,
  });
  return response.data;
};

export const editSummaryToCategory = async (
  summaryId: string | number,
  summaryTitle: string,
  summaryContent: string
) => {
  const response = await authClient.patch(
    `api/categorized-summary/edit/${summaryId}`,
    {
      summaryTitle,
      summaryContent,
    }
  );
  return response.data;
};

export const getSummaryFromCategory = async (
  summaryId: string | number,
  isAuthenticated: boolean
) => {
  const path = `api/categorized-summary/${summaryId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const deleteSummaryFromCategory = async (summaryId: string | number) => {
  const response = await authClient.delete(
    `api/categorized-summary/delete/${summaryId}`
  );
  return response.data;
};
