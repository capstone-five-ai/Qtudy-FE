import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';
import SummaryApi from '../api/SummaryApi';

export const useCreateSummaryByPdf = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(SummaryApi.createByPdf, {
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        // TODO: fileId 받아서 이동시키기.
        navigate('/select');
      }, 1100);
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
      console.log(data);
      setTimeout(() => {
        // TODO: fileId 받아서 이동시키기.
        navigate('/select');
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
