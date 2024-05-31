import { getUserSummaryItem } from '@/apis/summaryApi';
import authState from '@/recoils/atoms/authState';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetUserSummaryItem = (summaryId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getUserSummary', summaryId],
    queryFn: () => getUserSummaryItem(summaryId, isAuthenticated),
    enabled: !!summaryId,
  });
};
