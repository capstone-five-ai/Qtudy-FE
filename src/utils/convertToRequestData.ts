import { GenerateAIQuizOption } from '@/types/quiz.type';

interface ConvertType {
  [key: string]: string;
}

const AMOUNT: ConvertType = {
  적게: 'FEW',
  적당히: 'MEDIUM',
  많이: 'MANY',
  //짧게: 'FEW',
  //길게: 'MANY',
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

export const convertToQuizRequestData = (inputOption: GenerateAIQuizOption) => {
  const convert: GenerateAIQuizOption = {
    type: TYPE[inputOption.type],
    amount: AMOUNT[inputOption.amount],
    difficulty: DIFFICULTY[inputOption.difficulty],
    fileName: inputOption.fileName,
  };

  return convert;
};

/* export const convertToSummaryData = (inputOption: ConvertType) => {
  const convert: SummaryOptionType = {
    amount: AMOUNT[inputOption.amount],
    fileName: inputOption.file,
  };

  return convert;
};
 */
