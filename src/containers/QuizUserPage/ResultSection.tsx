import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import QuizCheckForm from '@/components/Form/QuizCheckForm';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import DefaultSidebar from '@/components/Sidebar/DefaultSidebar';
import { useGetUserQuizItem } from '@/hooks/useGetQuiz';
import useRedirect from '@/hooks/useRedirect';
import authState from '@/recoils/atoms/authState';
import { GenerateUserQuizItem } from '@/types/quiz.type';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ResultSection() {
  const [searchParams] = useSearchParams();
  const quizId = Number(searchParams.get('id'));
  const isAuthenticated = useRecoilValue(authState);
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState<GenerateUserQuizItem>();
  const { data: fetchedQuiz, isLoading, error } = useGetUserQuizItem(quizId);
  const redirect = useRedirect();

  useEffect(() => {
    if (isNaN(quizId) || error) {
      redirect('/quiz/user');
    }
  }, [quizId, error, redirect]);

  useEffect(() => {
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz.response);
    }
  }, [fetchedQuiz]);

  if (isLoading) return <div>Loading...</div>;

  if (quiz)
    return (
      <>
        <StyledContent>
          <StyledInnerContent>
            <QuizCheckForm quiz={quiz} />
          </StyledInnerContent>
        </StyledContent>
        <DefaultSidebar>
          <SidebarContentContainer>
            <StyledButtonContainer>
              <ShareLinkButton link={window.location.href} />
            </StyledButtonContainer>
            <SaveToCategoryButton
              disabled={!isAuthenticated}
              onClick={() => setShowModal(true)}
            />
          </SidebarContentContainer>
        </DefaultSidebar>
        {showModal && (
          <SaveToCategoryModal
            categoryType="QUIZ"
            contentId={quizId}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
}

export default ResultSection;

const StyledContent = styled.div`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-right: 20px;
`;

const StyledInnerContent = styled.div`
  height: 100%;

  overflow-y: scroll;
  ${Scrollbar}
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
