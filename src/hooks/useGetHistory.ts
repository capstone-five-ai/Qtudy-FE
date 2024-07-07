import { getAIQuizAllFile } from '@/apis/quizApi';
import { getAISummaryAllFile } from '@/apis/summaryApi';
import {
  HISTORY_QUIZ_QUERY_KEY,
  HISTORY_SUMMARY_QUERY_KEY,
} from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetQuizHistory = (page: number) => {
  return useQuery({
    queryKey: [HISTORY_QUIZ_QUERY_KEY, { page }],
    queryFn: () => getAIQuizAllFile(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetSummaryHistory = (page: number) => {
  return useQuery({
    queryKey: [HISTORY_SUMMARY_QUERY_KEY, { page }],
    queryFn: () => getAISummaryAllFile(page),
    staleTime: 5 * 60 * 1000,
  });
};
