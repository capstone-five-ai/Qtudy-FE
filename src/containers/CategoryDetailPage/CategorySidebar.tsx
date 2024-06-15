import { deleteQuizFromCategory } from '@/apis/quizCategoryApi';
import { deleteSummaryFromCategory } from '@/apis/summaryCategoryApi';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import Sidebar from '@/components/Sidebar/DefaultSidebar';
import useToast from '@/hooks/useToast';
import { ServiceType } from '@/types/category.type';
import { CategoryQuizItem } from '@/types/quiz.type';
import { CategorySummaryItem } from '@/types/summary.type';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategorySidebarProps {
  isAuthenticated: boolean;
  contentType: ServiceType;
  contentQuiz?: CategoryQuizItem | undefined;
  contentSummary?: CategorySummaryItem | undefined;
  categoryId: number;
  contentId: number;
}

interface DetailItem {
  title: string;
  path: string | null;
}

function CategorySidebar({
  isAuthenticated,
  contentType,
  contentQuiz,
  contentSummary,
  categoryId,
  contentId,
}: CategorySidebarProps) {
  const navigate = useNavigate();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<DetailItem>();
  const [prevItem, setPrevItem] = useState<DetailItem>();
  const [nextItem, setNextItem] = useState<DetailItem>();
  const { fireToast } = useToast();

  useEffect(() => {
    if (contentType === 'QUIZ' && contentQuiz) {
      setCurrentItem({ title: contentQuiz.problemName, path: null });
      setPrevItem({
        title: contentQuiz.previousProblem?.categorizedProblemName ?? ' ',
        path: contentQuiz.previousProblem
          ? `/management/category/quiz?id=${contentQuiz.previousProblem.categorizedProblemId}`
          : null,
      });
      setNextItem({
        title: contentQuiz.nextProblem?.categorizedProblemName ?? ' ',
        path: contentQuiz.nextProblem
          ? `/management/category/quiz?id=${contentQuiz.nextProblem.categorizedProblemId}`
          : null,
      });
    }

    if (contentType === 'SUMMARY' && contentSummary) {
      setCurrentItem({ title: contentSummary.summaryTitle, path: null });
      setPrevItem({
        title: contentSummary.previousSummary?.categorizedSummaryName ?? '',
        path: contentSummary.previousSummary
          ? `/management/category/summary?id=${contentSummary.previousSummary.categorizedSummaryId}`
          : null,
      });
      setNextItem({
        title: contentSummary.nextSummary?.categorizedSummaryName ?? '',
        path: contentSummary.nextSummary
          ? `/management/category/summary?id=${contentSummary.nextSummary.categorizedSummaryId}`
          : null,
      });
    }
  }, [contentQuiz, contentSummary]);

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

      setShowDeleteModal(false);
      navigate(
        `/management/category?type=${contentType.toLowerCase()}&categoryId=${categoryId}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          title={`${contentType === 'QUIZ' ? '퀴즈를' : '요약을'} 삭제하시겠습니까?`}
          onConfirm={handleDeleteItem}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      {showAddCategoryModal && (
        <SaveToCategoryModal
          categoryType={contentType}
          contentId={contentId}
          currentCategoryId={categoryId}
          onClose={() => setShowAddCategoryModal(false)}
        />
      )}
      <StyledSidebar>
        <StyledContentContainer>
          <StyledOtherItemContainer>
            <button
              type="button"
              className="other-item"
              onClick={() => {
                if (prevItem?.path) navigate(prevItem.path);
              }}
            >
              <span className="title">Pre</span>
              <p className="content">{prevItem?.title}</p>
            </button>

            <div className="current-item">
              <p className="content">{currentItem?.title}</p>
              <DeleteIcon
                width={20}
                height={20}
                cursor="pointer"
                onClick={() => setShowDeleteModal(true)}
              />
            </div>
            <button
              type="button"
              className="other-item"
              onClick={() => {
                if (nextItem?.path) navigate(nextItem.path);
              }}
            >
              <span className="title">Next</span>
              <p className="content">{nextItem?.title}</p>
            </button>
          </StyledOtherItemContainer>
          <StyledButtonContainer>
            <ShareLinkButton link={window.location.href} />
            <SaveToCategoryButton
              generateType={contentType}
              onClick={() => setShowAddCategoryModal(true)}
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
    min-height: 19.5px;
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
