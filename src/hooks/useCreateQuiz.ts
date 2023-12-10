import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import QuizApi from '../api/QuizApi';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';

const useCreateQuizByText = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  return useMutation(QuizApi.createByText, {
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        navigate('/select');
      }, 1100);
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response!.data as ErrorType;
      window.alert(errorData.errorMessage);
      setShowLoader(false);
    },
  });
};

export default useCreateQuizByText;
