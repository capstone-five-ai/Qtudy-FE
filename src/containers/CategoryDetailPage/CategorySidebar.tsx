import { deleteQuizFromCategory } from '@/apis/quizCategoryApi';
import { deleteSummaryFromCategory } from '@/apis/summaryCategoryApi';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import Sidebar from '@/components/Sidebar/Sidebar';
import useToast from '@/hooks/useToast';
import { ServiceType } from '@/types/category.type';
import { CategoryQuizItem } from '@/types/quiz.type';
import { CategorySummaryItem } from '@/types/summary.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategorySidebarProps {
  isAuthenticated: boolean;
  contentType: ServiceType;
  contentQuiz?: CategoryQuizItem | undefined;
  contentSummary?: CategorySummaryItem | undefined;
  categoryId: number;
}

function CategorySidebar({
  isAuthenticated,
  contentType,
  contentQuiz,
  contentSummary,
  categoryId,
}: CategorySidebarProps) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { fireToast } = useToast();

  const handleDeleteItem = async () => {
    try {
      if (contentType === 'QUIZ' && contentQuiz) {
        await deleteQuizFromCategory(contentQuiz?.categorizedProblemId);
        fireToast({
          icon: <DeleteIcon width={20} height={20} />,
          message: '항목이 삭제되었습니다',
        });
      }

      if (contentType === 'SUMMARY' && contentSummary) {
        await deleteSummaryFromCategory(contentSummary?.categorizedSummaryId);
        fireToast({
          icon: <DeleteIcon width={20} height={20} />,
          message: '항목이 삭제되었습니다',
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          title={`${contentType === 'QUIZ' ? '퀴즈를' : '요약을'} 삭제하시겠습니까?`}
          onConfirm={() => {
            handleDeleteItem();
            setShowDeleteModal(false);
            navigate(
              `/management/category?type=${contentType.toLowerCase()}&categoryId=${categoryId}`
            );
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      <StyledSidebar>
        <StyledContentContainer>
          {contentType === 'QUIZ' && contentQuiz && (
            <StyledOtherItemContainer>
              {contentQuiz.previousProblem && (
                <button
                  type="button"
                  className="other-item"
                  onClick={() =>
                    navigate(
                      `/management/category/quiz?id=${contentQuiz.previousProblem?.categorizedProblemId}`
                    )
                  }
                >
                  <span className="title">Pre</span>
                  <p className="content">
                    Q. {contentQuiz.previousProblem.categorizedProblemName}
                  </p>
                </button>
              )}
              <div className="current-item">
                <p className="content">Q. {contentQuiz.problemName}</p>
                <DeleteIcon
                  width={20}
                  height={20}
                  cursor="pointer"
                  onClick={() => setShowDeleteModal(true)}
                />
              </div>
              {contentQuiz.nextProblem && (
                <button
                  type="button"
                  className="other-item"
                  onClick={() =>
                    navigate(
                      `/management/category/quiz?id=${contentQuiz.nextProblem?.categorizedProblemId}`
                    )
                  }
                >
                  <span className="title">Next</span>
                  <p className="content">
                    Q. {contentQuiz.nextProblem.categorizedProblemName}
                  </p>
                </button>
              )}
            </StyledOtherItemContainer>
          )}
          {contentType === 'SUMMARY' && contentSummary && (
            <StyledOtherItemContainer>
              {contentSummary.previousSummary && (
                <button
                  type="button"
                  className="other-item"
                  onClick={() =>
                    navigate(
                      `/management/category/summary?id=${contentSummary.previousSummary?.categorizedSummaryId}`
                    )
                  }
                >
                  <span className="title">Pre</span>
                  <p className="content">
                    {contentSummary.previousSummary.categorizedSummaryName}
                  </p>
                </button>
              )}
              <div className="current-item">
                <p className="content">{contentSummary.summaryTitle}</p>
                <DeleteIcon
                  width={20}
                  height={20}
                  cursor="pointer"
                  onClick={() => setShowDeleteModal(true)}
                />
              </div>
              {contentSummary.nextSummary && (
                <button
                  type="button"
                  className="other-item"
                  onClick={() =>
                    navigate(
                      `/management/category/summary?id=${contentSummary.nextSummary?.categorizedSummaryId}`
                    )
                  }
                >
                  <span className="title">Next</span>
                  <p className="content">
                    {contentSummary.nextSummary.categorizedSummaryName}
                  </p>
                </button>
              )}
            </StyledOtherItemContainer>
          )}
          <StyledButtonContainer>
            <ShareLinkButton link="" />
            <SaveToCategoryButton
              onClick={() => {
                // TODO: 카테고리 저장
              }}
              disabled={!isAuthenticated}
            />
          </StyledButtonContainer>
        </StyledContentContainer>
      </StyledSidebar>
    </>
  );
}

export default CategorySidebar;

const StyledSidebar = styled(Sidebar)`
  padding: 0;
`;

const StyledContentContainer = styled.div`
  height: 100%;
  padding: 16px 36px 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledOtherItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    width: 276px;
    padding-left: 28px;

    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};
    white-space: pre-line;
    word-break: break-all;
  }

  .other-item {
    display: flex;
    flex-direction: column;
    text-align: left;

    .title {
      ${({ theme }) => theme.typography.body2};
      color: rgba(54, 189, 180, 0.72);
      padding-left: 28px;
    }
  }

  .current-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    position: relative;

    .content {
      color: ${({ theme }) => theme.colors.grayScale01};
    }

    &::before {
      content: '';
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0;
      left: -1px;
      background-color: ${({ theme }) => theme.colors.mainMint};
    }
  }
`;

const StyledButtonContainer = styled.div`
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
`;
