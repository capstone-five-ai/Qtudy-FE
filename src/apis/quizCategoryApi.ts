import { authClient } from '@/apis/client';

export const postQuizToCategory = async (
  categoryIdList: number[],
  quizId: number
) => {
  const response = await authClient.post('api/categorized-problem/new', {
    categoryIdList: categoryIdList,
    problemId: quizId,
  });
  return response.data;
};
