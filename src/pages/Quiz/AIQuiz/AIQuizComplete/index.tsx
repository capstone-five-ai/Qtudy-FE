import { useState } from 'react';
import styled from 'styled-components';
import LinkButton from '../../../../components/Button/LinkButton';
import TwinkleButton from '../../../../components/Button/TwinkleButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Question from '../../../../components/Question';
import { QuestionType } from '../../../../types/question.type';
import NumberPannel from './NumberPannel';
import PDFButton from './PDFButton';

function AIQuizComplete() {
  // AI 퀴즈의 경우 문제 번호에 따라 보여줘야 함
  const [questionNum, setQuestionNum] = useState(1);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;

  const question: QuestionType = {
    problemName: '인공지능은 무엇을 모방할 수 있는 기술 및 연구 분야인가요?',
    problemAnswer: null,
    problemCommentary:
      '인공지능의 목표는 인간의 인지 능력을 모방할 수 있는 지능적인 기계를 만드는 것입니다. 즉, 사람처럼 생각하고 학습하며 문제를 해결할 수 있는 기계를 개발하는 것이 목표입니다.',
    problemType: 'SUBJECTIVE',
    problemChoices: ['선지1', '선지2', '선지3', '선지4'],
  };

  return (
    <>
      <MainWrapper>
        <Question question={question} questionNum={questionNum} />
      </MainWrapper>

      <SideWrapper>
        <SideBar>
          <div>
            <NumberPannel numOfQuiz={28} questionNum={questionNum} setQuestionNum={setQuestionNum} />
            <ButtonWrapper>
              <LinkButton link={link} />
              <PDFWrapper>
                <PDFButton label="퀴즈" />
                <PDFButton label="정답" />
              </PDFWrapper>
            </ButtonWrapper>
          </div>

          <TwinkleButton disabled={false} onClick={() => setShowCategoryModal(true)}>
            Save to Category
          </TwinkleButton>
        </SideBar>
      </SideWrapper>
      {showCategoryModal && <CategoryModal onClose={() => setShowCategoryModal(false)} categoryType="PROBLEM" />}
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
