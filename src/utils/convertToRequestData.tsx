import { QuizOptionType } from '../types/quiz.type';
import { SummaryOptionType } from '../types/summary.type';

interface ConvertType {
  [key: string]: string;
}

const AMOUNT: ConvertType = {
  적게: 'FEW',
  적당히: 'MEDIUM',
  많이: 'MANY',
};

const DIFFICULTY: ConvertType = {
  상: 'HARD',
  중: 'MODERATE',
  하: 'EASY',
};

const TYPE: ConvertType = {
  객관식: 'MULTIPLE',
  주관식: 'SUBJECTIVE',
};

export const convertToRequestData = (inputOption: ConvertType) => {
  const convert: QuizOptionType = {
    type: TYPE[inputOption.type],
    amount: AMOUNT[inputOption.amount],
    difficulty: DIFFICULTY[inputOption.difficulty],
    fileName: inputOption.file,
  };

  return convert;
};

export const convertToSummaryData = (inputOption: SummaryOptionType) => {
  const convert: SummaryOptionType = {
    amount: AMOUNT[inputOption.amount],
    file: inputOption.file,
  };

  return convert;
};
