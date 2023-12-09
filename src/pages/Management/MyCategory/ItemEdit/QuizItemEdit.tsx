import { Navigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import MultipleQuiz from '../../../Quiz/UserQuiz/CreateUserQuiz/MultipleQuiz';
import { QuestionType } from '../../../../types/question.type';
import SubjectiveQuiz from '../../../Quiz/UserQuiz/CreateUserQuiz/SubjectiveQuiz';

const DEFAULT_INPUT = { input: '', check: false };

function QuizItemEdit() {
  const [params] = useSearchParams();

  const questionData: QuestionType = {
    problemName: '인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?',
    problemAnswer: '2',
    problemCommentary:
      '인공지능의 목표는 인간의 인지 능력을 모방할 수 있는 지능적인 기계를 만드는 것입니다. 즉, 사람처럼 생각하고 학습하며 문제를 해결할 수 있는 기계를 개발하는 것이 목표입니다.',
    problemType: 'MULTIPLE',
    problemChoices: ['선지111', '선지222', '선지333', '선지444'],
  };

  const answerNum = parseInt(questionData.problemAnswer || '', 10);

  const [question, setQuestion] = useState({ input: questionData.problemName, check: true });
  const [options, setOptions] = useState(
    questionData.problemChoices.map((item) => {
      return { input: item, check: true };
    })
  );
  const [answer, setAnswer] = useState(!Number.isNaN(answerNum) ? answerNum : -1);
  const [commentary, setCommentary] = useState({ input: questionData.problemCommentary, check: true });

  const handleEdit = (type: string, index: number) => {
    if (type === 'question') {
      setQuestion({ ...question, check: false });
    } else if (type === 'option') {
      const updatedOption = [...options];
      updatedOption[index] = { ...updatedOption[index], check: false };
      setOptions(updatedOption);
    } else if (type === 'commentary') {
      setCommentary({ ...commentary, check: false });
    }
  };

  const handleCheck = (type: string, index: number, input: string) => {
    if (type === 'question') {
      setQuestion({ input, check: true });
    } else if (type === 'option') {
      const updatedOption = [...options];
      updatedOption[index] = { input, check: true };
      setOptions(updatedOption);
    } else if (type === 'commentary') {
      setCommentary({ input, check: true });
    }
  };

  const handleDelete = (indexToDelete: number) => {
    setOptions((prevOptions) => {
      return prevOptions.filter((_, index) => index !== indexToDelete);
    });

    if (indexToDelete === answer - 1) setAnswer(-1);
  };

  const handleAddOption = () => {
    setOptions([...options, DEFAULT_INPUT]);
  };

  const handleFinishEdit = () => {
    // TODO: 문제 수정 API 연결
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit handleFinishEdit={handleFinishEdit}>
        {questionData.problemType === 'MULTIPLE' ? (
          <MultipleQuiz
            question={question}
            options={options}
            answer={answer}
            commentary={commentary}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleAddOption={handleAddOption}
            handleSetAnswer={setAnswer}
          />
        ) : (
          <SubjectiveQuiz
            question={question}
            answer={answer}
            commentary={commentary}
            handleEdit={handleEdit}
            handleCheck={handleCheck}
          />
        )}
      </CategoryItemContentWrapper>
      <NoButtonSideBar />
    </>
  );
}

export default QuizItemEdit;
