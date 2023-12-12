import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { ErrorType } from '../types';
import loadingSelector from '../recoil/selectors/loading';
import SummaryApi from '../api/SummaryApi';
import { SummaryCreationByFileType, SummaryCreationByTextType } from '../types/summary.type';

export const useCreateSummaryByImage = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByImageMutation = useMutation(
    async (data: { fileName: string; summaryData: SummaryCreationByFileType }) => {
      const { fileName, summaryData } = data;
      const response = await SummaryApi.createByImage(summaryData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/summary/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
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

export const useCreateSummaryByPdf = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByPdfMutation = useMutation(
    async (data: { fileName: string; summaryData: SummaryCreationByFileType }) => {
      const { fileName, summaryData } = data;
      const response = await SummaryApi.createByPdf(summaryData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/summary/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
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

export const useCreateSummaryByText = () => {
  const navigate = useNavigate();
  const setShowLoader = useSetRecoilState(loadingSelector);

  const createByTextMutation = useMutation(
    async (data: { fileName: string; summaryData: SummaryCreationByTextType }) => {
      const { fileName, summaryData } = data;
      const response = await SummaryApi.createByText(summaryData);
      return { response, fileName };
    },
    {
      onSuccess: (data) => {
        const { response, fileName } = data;
        setTimeout(() => {
          navigate(`/summary/ai?complete=true&id=${response.fileId}&fileName=${fileName}`);
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
