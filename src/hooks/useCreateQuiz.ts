import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import QuizApi from '../api/QuizApi';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';
import { QuizCreationByFileType, QuizCreationByTextType } from '../types/quiz.type';

export const useCreateQuizByImage = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByImageMutation = useMutation(
    async (data: { fileName: string; quizData: QuizCreationByFileType }) => {
      const { fileName, quizData } = data;
      const response = await QuizApi.createByImage(quizData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/quiz/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
        }, 1000);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response!.data as ErrorType;
        if (errorData.errorCode === 'H-002') {
          window.alert(errorData.errorMessage);
        }
        setShowLoader(false);
      },
    }
  );

  return createByImageMutation;
};

export const useCreateQuizByPdf = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByPdfMutation = useMutation(
    async (data: { fileName: string; quizData: QuizCreationByFileType }) => {
      const { fileName, quizData } = data;
      const response = await QuizApi.createByPdf(quizData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/quiz/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
        }, 1000);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response!.data as ErrorType;
        if (errorData.errorCode === 'H-002') {
          window.alert(errorData.errorMessage);
        }
        setShowLoader(false);
      },
    }
  );

  return createByPdfMutation;
};

export const useCreateQuizByText = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByTextMutation = useMutation(
    async (data: { fileName: string; quizData: QuizCreationByTextType }) => {
      const { fileName, quizData } = data;
      const response = await QuizApi.createByText(quizData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/quiz/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
        }, 1000);
      },
      onError: (error: unknown) => {
        const axiosError = error as AxiosError;
        const errorData = axiosError.response!.data as ErrorType;
        if (errorData.errorCode === 'H-002') {
          window.alert(errorData.errorMessage);
        }
        setShowLoader(false);
      },
    }
  );

  return createByTextMutation;
};

export const useCreateQuizByUser = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(QuizApi.createByUser, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/quiz/user?complete=true&id=${data.memberSavedProblemId}`);
      }, 1000);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response!.data as ErrorType;
      if (errorData.errorCode === 'H-002') {
        window.alert(errorData.errorMessage);
      }
      setShowLoader(false);
    },
  });
};
