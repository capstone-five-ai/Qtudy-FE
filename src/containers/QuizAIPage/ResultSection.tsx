import PDFDownloadButton from '@/components/Button/PDFDownloadButton';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import QuizCheckForm from '@/components/Form/QuizCheckForm';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import NumberPanel from '@/components/NumberPanel/NumberPanel';
import Sidebar from '@/components/Sidebar/Sidebar';
import authState from '@/recoils/atoms/authState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ResultSection() {
  const isAuthenticated = useRecoilValue(authState);
  const [showModal, setShowModal] = useState(false);
  const [quizNum, setQuizNum] = useState(1);
  const [isWriter, setIsWriter] = useState(false);
  const [quiz, setQuiz] = useState({
    problemName: '문제 이름',
    problemContent: '문제 내용',
    problemAnswer: 2,
    problemCommentary: '문제 해설',
    problemType: 'MULTIPLE',
    problemChoices: ['선택지1', '선택지2', '선택지3', '선택지4'],
  });

  return (
    <>
      <StyledContent>
        <QuizCheckForm quiz={quiz} />
      </StyledContent>
      <Sidebar>
        <SidebarContentContainer>
          <ContentInnerContainer>
            <NumberPanel
              numOfQuiz={10}
              questionNum={quizNum}
              setQuestionNum={setQuizNum}
            />
            <ShareLinkButton link={window.location.href} />
            {isWriter && (
              <PDFButtonWrapper>
                <PDFDownloadButton pdfType="QUIZ" variant={1} />
                <PDFDownloadButton pdfType="ANSWER" variant={1} />
              </PDFButtonWrapper>
            )}
          </ContentInnerContainer>
          <SaveToCategoryButton
            disabled={!isAuthenticated}
            onClick={() => setShowModal(true)}
          />
        </SidebarContentContainer>
      </Sidebar>
      {showModal && <SaveToCategoryModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default ResultSection;

const StyledContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-right: 20px;
`;

const SidebarContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
`;

const ContentInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

const PDFButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
