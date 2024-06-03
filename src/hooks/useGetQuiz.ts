import { getAIQuizFile, getUserQuizItem } from '@/apis/quizApi';
import { getQuizFromCategory } from '@/apis/quizCategoryApi';
import authState from '@/recoils/atoms/authState';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';

export const useGetAIQuizFile = (fileId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getAIQuiz', fileId],
    queryFn: () => getAIQuizFile(fileId, isAuthenticated),
    enabled: !!fileId,
  });
};

export const useGetUserQuizItem = (quizId: number) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getUserQuiz', quizId],
    queryFn: () => getUserQuizItem(quizId, isAuthenticated),
    enabled: !!quizId,
  });
};

export const useGetCategoryQuizItem = (quizId: number | string) => {
  const isAuthenticated = useRecoilValue(authState);

  return useQuery({
    queryKey: ['getCategoryQuiz', quizId],
    queryFn: () => getQuizFromCategory(quizId, isAuthenticated),
    enabled: !!quizId,
  });
};
