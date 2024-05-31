import { authClient } from '@/apis/client';

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
