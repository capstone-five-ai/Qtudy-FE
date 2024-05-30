import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import QuizCheckForm from '@/components/Form/QuizCheckForm';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import Sidebar from '@/components/Sidebar/Sidebar';
import authState from '@/recoils/atoms/authState';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ResultSection() {
  const isAuthenticated = useRecoilValue(authState);
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({
    problemName: '문제 이름',
    problemContent: '문제 내용',
    problemAnswer: 2,
    problemCommentary: '문제 해설',
    problemType: 'MULTIPLE',
    problemChoices: ['선택지1', '선택지2', '선택지3', '선택지4'],
  });
  //const [isWriter, setIsWriter] = useState<boolean>();
  const [qs] = useSearchParams();
  const quizId = Number(qs.get('id'));

  /* const getQuiz = useCallback(
    async (id: number) => {
      const data = await QuizApi.getUserQuiz(id, isAuthenticated);
      setQuestion(data.response);

      if (data.isWriter) setIsWriter(true);
    },
    [isAuthenticated]
  ); */

  /* useEffect(() => {
    if (memberSavedProblemId === undefined) return;
    getQuiz(memberSavedProblemId);
  }, [getQuiz, memberSavedProblemId]);

  if (!question) return null; */

  return (
    <>
      <StyledContent>
        <QuizCheckForm quiz={quiz} />
      </StyledContent>
      <Sidebar>
        <SidebarContentContainer>
          <StyledButtonContainer>
            <ShareLinkButton link={window.location.href} />
          </StyledButtonContainer>
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
  justify-content: flex-end;
  gap: 30px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
