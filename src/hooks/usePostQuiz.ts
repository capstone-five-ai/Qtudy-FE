import {
  postQuizByImage,
  postQuizByPdf,
  postQuizByText,
  postQuizByUser,
} from '@/apis/quizApi';
import loadingState from '@/recoils/atoms/loadingState';
import {
  GenerateQuizOption,
  GenerateQuizType,
  QuizType,
} from '@/types/quiz.type';
import {
  QUIZ_TYPE,
  convertToQuizRequestData,
} from '@/utils/convertToRequestData';
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
      option: GenerateQuizOption;
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

  const createByPdfMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateQuizOption;
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

  return createByPdfMutation;
};

export const usePostQuizByImage = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByImageMutation = useMutation({
    mutationFn: async ({
      option,
      file,
    }: {
      option: GenerateQuizOption;
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

  return createByImageMutation;
};

export const usePostQuizByUser = () => {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingState);

  const createByUserMutation = useMutation({
    mutationFn: async ({
      newQuizData,
      quizType,
    }: {
      newQuizData: QuizType;
      quizType: GenerateQuizType;
    }) => {
      try {
        setLoading(true);

        const response = await postQuizByUser({
          ...newQuizData,
          problemType: QUIZ_TYPE[quizType],
        });
        setTimeout(() => {
          navigate(`/quiz/user?complete=true&id=${response.problemId}`);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // TODO: 에러 처리 로직
        setLoading(false);
      }
    },
  });

  return createByUserMutation;
};
