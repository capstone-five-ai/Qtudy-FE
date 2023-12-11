import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';
import SummaryApi from '../api/SummaryApi';

export const useCreateSummaryByImage = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(SummaryApi.createByImage, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/summary/ai?complete=true&id=${data.fileId}`);
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

export const useCreateSummaryByPdf = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(SummaryApi.createByPdf, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/summary/ai?complete=true&id=${data.fileId}`);
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

export const useCreateSummaryByText = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(SummaryApi.createByText, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/summary/ai?complete=true&id=${data.fileId}`);
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

export const useCreateSummaryByUser = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(SummaryApi.createByUser, {
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(`/summary/ai?complete=true&id=${data.memberSavedSummaryId}`);
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
