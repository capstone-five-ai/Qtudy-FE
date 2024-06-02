import { getAISummaryFile, getUserSummaryItem } from '@/apis/summaryApi';
import { getSummaryFromCategory } from '@/apis/summaryCategoryApi';
import authState from '@/recoils/atoms/authState';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetAISummaryFile = (fileId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getAISummary', fileId],
    queryFn: () => getAISummaryFile(fileId, isAuthenticated),
    enabled: !!fileId,
  });
};

export const useGetUserSummaryItem = (summaryId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getUserSummary', summaryId],
    queryFn: () => getUserSummaryItem(summaryId, isAuthenticated),
    enabled: !!summaryId,
  });
};

export const useGetCategorySummaryItem = (summaryId: number | string) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getCategorySummary', summaryId],
    queryFn: () => getSummaryFromCategory(summaryId, isAuthenticated),
    enabled: !!summaryId,
  });
};
