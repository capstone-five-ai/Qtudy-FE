import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import QuizApi from '../../../../api/QuizApi';
import LinkButton from '../../../../components/Button/LinkButton';
import TwinkleButton from '../../../../components/Button/TwinkleButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Question from '../../../../components/Question';
import { QuestionType } from '../../../../types/question.type';
import authState from '../../../../recoil/atoms/authState';

function UserQuizComplete() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;
  const [question, setQuestion] = useState<QuestionType>();
  const [qs] = useSearchParams();
  const memberSavedProblemId = Number(qs.get('id'));
  const [isWriter, setIsWriter] = useState<boolean>();
  const isAuthenticated = useRecoilValue(authState);

  const getQuiz = useCallback(
    async (id: number) => {
      const data = await QuizApi.getUserQuiz(id, isAuthenticated);
      setQuestion(data.response);

      if (data.isWriter) setIsWriter(true);
    },
    [isAuthenticated]
  );

  useEffect(() => {
    if (memberSavedProblemId === undefined) return;
    getQuiz(memberSavedProblemId);
  }, [getQuiz, memberSavedProblemId]);

  if (!question) return <div />;

  return (
    <>
      <MainWrapper>
        <Question question={question} />
      </MainWrapper>

      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <LinkButton link={link} />
          </ButtonWrapper>

          {isWriter !== undefined && (
            <TwinkleButton disabled={!isWriter} onClick={() => setShowCategoryModal(true)}>
              Save to Category
            </TwinkleButton>
          )}
        </SideBar>
      </SideWrapper>
      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="PROBLEM"
          contentId={memberSavedProblemId || -1}
          generateType="user"
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
  padding-bottom: 30px;
  gap: 16px;
  justify-content: end;
  align-items: end;

  height: 100%;
`;

export default UserQuizComplete;
