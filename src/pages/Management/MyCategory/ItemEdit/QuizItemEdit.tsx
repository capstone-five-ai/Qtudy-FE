import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { QuestionType } from '../../../../types/question.type';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import NoButtonSideBar from '../../../../components/SideBar/NoButtonSideBar';
import EditAnswerAccordion from '../../../../components/Accordion/EditAnswerAccordion';
import { CREATE_USER_QUIZ_TYPE } from '../../../../constants';
import QuizView from '../../../Quiz/UserQuiz/CreateUserQuiz/QuizForm';
import { UserQuizInputType } from '../../../../types';
import QuizCategoryApi from '../../../../api/QuizCategoryApi';

function QuizItemEdit() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [quizId, setQuizId] = useState('');
  const [type, setType] = useState('MULTIPLE');
  const [question, setQuestion] = useState({ id: uuidv4(), input: '', check: true });
  const [answer, setAnswer] = useState(-1);
  const [commentary, setCommentary] = useState({ id: uuidv4(), input: '', check: true });
  const [options, setOptions] = useState<UserQuizInputType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;
    const id = params.get('id');
    if (id) setQuizId(id);

    if (state.quizData) {
      const quiz = state.quizData as QuestionType;
      const quizAnswer = Number(quiz.problemAnswer);
      setType(quiz.problemType);
      setQuestion({ ...question, input: quiz.problemName });
      setAnswer(!Number.isNaN(quizAnswer) ? quizAnswer : -1);
      setCommentary({ ...commentary, input: quiz.problemCommentary });

      if (quiz.problemType === 'MULTIPLE' && quiz.problemChoices) {
        const choices = quiz.problemChoices.map((choice) => {
          return { id: uuidv4(), input: choice, check: true };
        });

        setOptions(choices);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinishEdit = async () => {
    if (type === 'MULTIPLE') {
      const editQuizData = {
        problemName: question.input,
        problemAnswer: answer.toString(),
        problemCommentary: commentary.input,
        problemChoices: options.map((option) => option.input),
      };
      await QuizCategoryApi.edit(quizId, editQuizData).then(() => {
        navigate(`/management/mycategory/detail?category=quiz&id=${quizId}`);
      });
    } else {
      const editQuizData = {
        problemName: question.input,
        problemCommentary: commentary.input,
      };

      await QuizCategoryApi.edit(quizId, editQuizData).then(() => {
        navigate(`/management/mycategory/detail?category=quiz&id=${quizId}`);
      });
    }
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit handleFinishEdit={handleFinishEdit}>
        <QuizContainer>
          <QuizView
            quizType={type}
            question={question}
            options={options}
            answer={answer}
            setQuestion={setQuestion}
            setOptions={setOptions}
            setAnswer={setAnswer}
          />
          <EditAnswerAccordion
            answer={type === CREATE_USER_QUIZ_TYPE[0].value ? answer.toString() : null}
            commentary={commentary}
            setCommentary={setCommentary}
          />
        </QuizContainer>
      </CategoryItemContentWrapper>
      <NoButtonSideBar />
    </>
  );
}

export default QuizItemEdit;

const QuizContainer = styled.div`
  flex-grow: 1;
  margin: 40px 0px 40px 20px;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
  gap: 48px;
`;
