import { getAIQuizFile } from '@/apis/quizApi';
import authState from '@/recoils/atoms/authState';
import { AIQuizFile } from '@/types/quiz.type';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetAIQuizFile = (fileId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery<AIQuizFile>({
    queryKey: ['getQuiz', fileId],
    queryFn: () => getAIQuizFile(fileId, isAuthenticated),
    enabled: !!fileId,
  });
};
