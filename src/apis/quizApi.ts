import { authClient, noAuthClient } from '@/apis/client';
import { GenerateQuizOption, GenerateUserQuizOption } from '@/types/quiz.type';

export const getAIQuizAllFile = async (pageNumber: number) => {
  const response = await authClient.get(
    `api/problemFile/searchAiProblemFileList/${pageNumber}`
  );
  return response.data;
};

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

export const getUserQuizItem = async (
  quizId: number,
  isAuthenticated: boolean
) => {
  const path = `/api/member-saved-problem/${quizId}`;

  if (isAuthenticated) {
    const response = await authClient.get(path);
    return response.data;
  }
  const response = await noAuthClient.get(path);
  return response.data;
};

export const postQuizByText = async (
  option: GenerateQuizOption,
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
  option: GenerateQuizOption,
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
  option: GenerateQuizOption,
  file: FormData
) => {
  console.log(file);
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

export const postQuizByUser = async (newQuizData: GenerateUserQuizOption) => {
  const response = await authClient.post(
    'api/member-saved-problem/new',
    newQuizData
  );
  return response.data;
};
