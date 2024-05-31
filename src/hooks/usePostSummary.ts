import {
  postSummaryByImage,
  postSummaryByPdf,
  postSummaryByText,
  postSummaryByUser,
} from '@/apis/summaryApi';
import loadingState from '@/recoils/atoms/loadingState';
import { GenerateSummaryOption } from '@/types/summary.type';
import { convertToSummaryRequestData } from '@/utils/convertToRequestData';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const usePostSummaryByText = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByTextMutation = useMutation({
    mutationFn: async ({
      option,
      text,
    }: {
      option: GenerateSummaryOption;
      text: string;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToSummaryRequestData(option);
        const response = await postSummaryByText(convertedOption, text);
        setTimeout(() => {
          navigate(`/summary/ai?complete=true&id=${response.fileId}`);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // TODO: 에러 처리 로직
        setLoading(false);
      }
    },
  });

  return createByTextMutation;
};

export const usePostSummaryByPdf = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByPdfMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateSummaryOption;
      file: FormData;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToSummaryRequestData(option);
        const response = await postSummaryByPdf(convertedOption, file);
        setTimeout(() => {
          navigate(`/summary/ai?complete=true&id=${response.fileId}`);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // TODO: 에러 처리 로직
        setLoading(false);
      }
    },
  });

  return createByPdfMutation;
};

export const usePostSummaryByImage = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByImageMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateSummaryOption;
      file: FormData;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToSummaryRequestData(option);
        const response = await postSummaryByImage(convertedOption, file);
        setTimeout(() => {
          setLoading(false);
          navigate(`/summary/ai?complete=true&id=${response.fileId}`);
        }, 1000);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // TODO: 에러 처리 로직
        setLoading(false);
      }
    },
  });

  return createByImageMutation;
};

export const usePostSummaryByUser = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByUserMutation = useMutation({
    mutationFn: async ({
      title,
      summary,
    }: {
      title: string;
      summary: string;
    }) => {
      try {
        setLoading(true);

        const response = await postSummaryByUser({
          summaryTitle: title,
          summaryContent: summary,
        });
        setTimeout(() => {
          navigate(`/summary/user?complete=true&id=${response.summaryId}`);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error generating summary:', error);
        setLoading(false);
      }
    },
  });

  return createByUserMutation;
};
