import { authClient, noAuthClient } from '@/apis/client';
import { GenerateAIQuizOption } from '@/types/quiz.type';

export const getAIQuizFile = async (
  fileId: number,
  isAuthenticated: boolean
) => {
  const path = `api/problem/getFileProblems/${fileId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const postQuizByText = async (
  option: GenerateAIQuizOption,
  text: string
) => {
  const response = await authClient.post(
    'api/problemFile/generateProblemFileByText',
    {
      ...option,
      text,
    }
  );
  return response.data;
};

export const postQuizByPdf = async (
  option: GenerateAIQuizOption,
  file: FormData
) => {
  const response = await authClient.post(
    'api/problemFile/generateProblemFileByPdf',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...option },
    }
  );
  return response.data;
};

export const postQuizByImage = async (
  option: GenerateAIQuizOption,
  file: FormData
) => {
  const response = await authClient.post(
    'api/problemFile/generateProblemFileByImage',
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...option },
    }
  );
  return response.data;
};
