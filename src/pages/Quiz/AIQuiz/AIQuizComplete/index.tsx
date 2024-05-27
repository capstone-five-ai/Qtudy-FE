import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import QuizApi from '../../../../api/QuizApi';
import LinkButton from '../../../../components/Button/LinkButton';
import PDFButton from '../../../../components/Button/PDFButton';
import SaveButton from '../../../../components/Button/SaveButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Question from '../../../../components/Question';
import authState from '../../../../recoil/atoms/authState';
import { QuestionType } from '../../../../types/question.type';
import NumberPannel from './NumberPannel';

function AIQuizComplete() {
  const [qs] = useSearchParams();
  const fileId = Number(qs.get('id'));
  const fileName = Number(qs.get('fileName'));

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [isWriter, setIsWriter] = useState(false);
  const isAuthenticated = useRecoilValue(authState);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;

  const [question, setQuestion] = useState<QuestionType>();

  const getQuizList = useCallback(
    async (id: number) => {
      const data = await QuizApi.getAllAIQuiz(id, isAuthenticated);

      setQuestions(data.problems);
      setQuestion(data.problems[0]);

      if (data.isWriter) setIsWriter(true);
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (!fileId) return;
    getQuizList(fileId);
  }, [fileId, getQuizList]);

  useEffect(() => {
    if (!fileId) return;
    setQuestion(questions[questionNum - 1]); //
  }, [fileId, questionNum, questions]);

  if (!question) return <div />;

  return (
    <>
      <MainWrapper>
        <Question question={question} questionNum={questionNum} />
      </MainWrapper>

      <SideWrapper>
        <SideBar>
          <div>
            <NumberPannel numOfQuiz={questions.length} questionNum={questionNum} setQuestionNum={setQuestionNum} />
            <ButtonWrapper>
              <LinkButton link={link} />
              {isWriter && (
                <PDFWrapper>
                  <PDFButton
                    label="퀴즈"
                    fileId={fileId}
                    pdfType="PROBLEM"
                    type="ai"
                    fileName={`${fileName}_PROBLEM`}
                  />
                  <PDFButton label="정답" fileId={fileId} pdfType="ANSWER" type="ai" fileName={`${fileName}_ANSWER`} />
                </PDFWrapper>
              )}
            </ButtonWrapper>
          </div>

          <SaveButton disabled={!isWriter} onClick={() => setShowCategoryModal(true)} />
        </SideBar>
      </SideWrapper>
      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="quiz"
          contentId={question.aiGeneratedProblemId || -1}
          generateType="ai"
        />
      )}
    </>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  margin: 24px 0;
  padding: 0 36px;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 16px;
  align-items: end;
`;

const PDFWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export default AIQuizComplete;
