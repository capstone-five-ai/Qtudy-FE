import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import QuizApi from '../api/QuizApi';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';

export const useCreateQuizByText = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(QuizApi.createByText, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/quiz/ai?complete=true&id=${data.fileId}`);
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

export const useCreateQuizByPdf = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(QuizApi.createByPdf, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/quiz/ai?complete=true&id=${data.fileId}`);
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

export const useCreateQuizByImage = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(QuizApi.createByImage, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/quiz/ai?complete=true&id=${data.fileId}`);
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
