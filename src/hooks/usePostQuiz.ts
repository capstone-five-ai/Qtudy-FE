import { postQuizByImage, postQuizByPdf, postQuizByText } from '@/apis/quizApi';
import loadingState from '@/recoils/atoms/loadingState';
import { GenerateAIQuizOption } from '@/types/quiz.type';
import { convertToQuizRequestData } from '@/utils/convertToRequestData';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const usePostQuizByText = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByTextMutation = useMutation({
    mutationFn: async ({
      option,
      text,
    }: {
      option: GenerateAIQuizOption;
      text: string;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToQuizRequestData(option);
        const response = await postQuizByText(convertedOption, text);
        setTimeout(() => {
          navigate(`/quiz/ai?complete=true&id=${response.fileId}`);
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

export const usePostQuizByPdf = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByTextMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateAIQuizOption;
      file: FormData;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToQuizRequestData(option);
        const response = await postQuizByPdf(convertedOption, file);
        setTimeout(() => {
          navigate(`/quiz/ai?complete=true&id=${response.fileId}`);
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

export const usePostQuizByImage = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByTextMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateAIQuizOption;
      file: FormData;
    }) => {
      try {
        setLoading(true);
        const convertedOption = convertToQuizRequestData(option);
        const response = await postQuizByImage(convertedOption, file);
        setTimeout(() => {
          setLoading(false);
          navigate(`/quiz/ai?complete=true&id=${response.fileId}`);
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
