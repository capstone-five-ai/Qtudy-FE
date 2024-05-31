import { GenerateQuizOption } from '@/types/quiz.type';
import { GenerateSummaryOption } from '@/types/summary.type';

interface ConvertType {
  [key: string]: string;
}

const AMOUNT: ConvertType = {
  적게: 'FEW',
  적당히: 'MEDIUM',
  많이: 'MANY',
  짧게: 'FEW',
  길게: 'MANY',
};

const DIFFICULTY: ConvertType = {
  상: 'HARD',
  중: 'MODERATE',
  하: 'EASY',
};

export const QUIZ_TYPE: ConvertType = {
  객관식: 'MULTIPLE',
  주관식: 'SUBJECTIVE',
};

export const convertToQuizRequestData = (inputOption: GenerateQuizOption) => {
  const convert: GenerateQuizOption = {
    type: QUIZ_TYPE[inputOption.type],
    fileName: inputOption.fileName,
  };

  if (inputOption.amount) {
    convert.amount = AMOUNT[inputOption.amount];
  }

  if (inputOption.difficulty) {
    convert.difficulty = DIFFICULTY[inputOption.difficulty];
  }

  return convert;
};

export const convertToSummaryRequestData = (
  inputOption: GenerateSummaryOption
) => {
  const convert: GenerateSummaryOption = {
    fileName: inputOption.fileName,
  };

  if (inputOption.amount) {
    convert.amount = AMOUNT[inputOption.amount];
  }

  return convert;
};
