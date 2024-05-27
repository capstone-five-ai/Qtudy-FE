import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CategoryItemButtonBar from '../../../../components/ButtonBar/CategoryItemButtonBar';
import Scrollbar from '../../../../components/Scrollbar';
import QuizForm from '../../../Quiz/UserQuiz/CreateUserQuiz/QuizForm';
import { QuestionType } from '../../../../types/question.type';
import { UserQuizInputType } from '../../../../types';
import QuizCommentary from '../../../Quiz/UserQuiz/CreateUserQuiz/QuizCommentary';
import getCircleNum from '../../../../utils/getCircleNum';
import QuizCategoryApi from '../../../../api/QuizCategoryApi';

function QuizItemEdit() {
  const [params] = useSearchParams();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [quizId, setQuizId] = useState('');
  const [quizType, setQuizType] = useState('MULTIPLE');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<number>(-1);
  const [commentary, setCommentary] = useState('');
  const [choices, setChoices] = useState<UserQuizInputType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;
    setQuizId(params.get('id') || '');
    if (state.quizData) {
      const quiz = state.quizData as QuestionType;
      setQuizType(quiz.problemType);
      setQuestion(quiz.problemName);
      setCommentary(quiz.problemCommentary);
      if (quiz.problemType === 'MULTIPLE' && quiz.problemChoices) {
        setAnswer(Number(quiz.problemAnswer));
        setChoices(
          quiz.problemChoices.map((choice) => {
            return { id: uuidv4(), content: choice };
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  const handleFinishEdit = async () => {
    let editQuizData;
    if (quizType === 'MULTIPLE') {
      editQuizData = {
        problemName: question,
        problemAnswer: answer.toString(),
        problemCommentary: commentary,
        problemChoices: choices.map((option) => option.content),
      };
    } else {
      editQuizData = {
        problemName: question,
        problemCommentary: commentary,
      };
    }

    await QuizCategoryApi.edit(quizId, editQuizData).then(() => {
      navigate(`/management/mycategory/detail?category=quiz&id=${quizId}`);
    });
  };

  return (
    <>
      <StyledContainer>
        <CategoryItemButtonBar handleComplete={handleFinishEdit} isEdit />
        <StyledQuizContainer>
          <QuizForm
            quizType={quizType}
            question={question}
            choices={choices}
            answer={answer}
            setQuestion={setQuestion}
            setChoices={setChoices}
            setAnswer={setAnswer}
          />
          <QuizCommentary
            answer={answer !== -1 ? getCircleNum(answer) : null}
            commentary={commentary}
            setCommentary={setCommentary}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </StyledQuizContainer>
      </StyledContainer>
      <Sidebar />
    </>
  );
}

export default QuizItemEdit;

const StyledContainer = styled.div`
  flex-grow: 1;
  padding: 24px 0px 20px 40px;

  display: flex;
  flex-direction: column;
`;

const StyledQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding-right: 20px;
  overflow-y: scroll;

  ${Scrollbar}
`;

const Sidebar = styled.div`
  width: 360px;
  margin: 24px 0;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
`;
