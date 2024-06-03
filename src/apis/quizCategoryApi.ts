import { authClient, noAuthClient } from '@/apis/client';
import { QuizType } from '@/types/quiz.type';

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

export const editQuizToCategory = async (
  quizId: string | number,
  quizData: QuizType
) => {
  const response = await authClient.patch(
    `api/categorized-problem/edit/${quizId}`,
    quizData
  );
  return response.data;
};

export const getQuizFromCategory = async (
  quizId: string | number,
  isAuthenticated: boolean
) => {
  const path = `api/categorized-problem/${quizId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const deleteQuizFromCategory = async (quizId: string | number) => {
  const response = await authClient.delete(
    `api/categorized-problem/delete/${quizId}`
  );
  return response.data;
};
