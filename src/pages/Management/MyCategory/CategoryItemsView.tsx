import styled from 'styled-components';
import React from 'react';
import CategoryQuizItem from './CategoryQuizItem';
import DefaultView from './DefaultView';
import Scrollbar from '../../../components/Scrollbar';
import { ReactComponent as FileIcon } from '../../../assets/icons/icon-file.svg';
import Typography from '../../../components/Typography';
import CategorySummaryItem from './CategorySummaryItem';
import { CategoryInfoType, CategoryType } from '../../../types';
import { CategoryQuizItemsType } from '../../../types/quiz.type';
import { CategorySummaryItemsType } from '../../../types/summary.type';
import QuizCategoryApi from '../../../api/QuizCategoryApi';
import SummaryCategoryApi from '../../../api/SummaryCategoryApi';

interface CategoryItemsViewProps {
  activeTabBar: CategoryType;
  activeCategory: CategoryInfoType | null;
  activeCategoryQuizItems: CategoryQuizItemsType[];
  activeCategorySummaryItems: CategorySummaryItemsType[];
  setActiveCategoryQuizItems: React.Dispatch<React.SetStateAction<CategoryQuizItemsType[]>>;
  setActiveCategorySummaryItems: React.Dispatch<React.SetStateAction<CategorySummaryItemsType[]>>;
}

function CategoryItemsView({
  activeTabBar,
  activeCategory,
  activeCategoryQuizItems,
  activeCategorySummaryItems,
  setActiveCategoryQuizItems,
  setActiveCategorySummaryItems,
}: CategoryItemsViewProps) {
  const handleDeleteQuizItem = (quizId: number) => {
    // TODO: 카테고리에 저장된 퀴즈 삭제 API
    console.log(quizId);
    setActiveCategoryQuizItems([]);
  };

  const handleDeleteSummaryItem = (summaryId: number) => {
    // TODO: 카테고리에 저장된 요약 삭제 API
    console.log(summaryId);
    setActiveCategorySummaryItems([]);
  };

  const downloadQuiz = async () => {
    if (activeCategory) {
      await QuizCategoryApi.downloadQuiz(activeCategory.categoryId);
    }
  };

  const downloadAnswer = async () => {
    if (activeCategory) {
      await QuizCategoryApi.downloadAnswer(activeCategory.categoryId);
    }
  };

  const downloadSummary = async () => {
    if (activeCategory) {
      await SummaryCategoryApi.downloadSummary(activeCategory.categoryId);
    }
  };

  if (activeTabBar === '퀴즈')
    return (
      <Container>
        {activeCategoryQuizItems.length === 0 ? (
          <DefaultView />
        ) : (
          <>
            <DownloadButtonContainer>
              <button type="button" className="download-button" onClick={downloadQuiz}>
                <FileIcon />
                <Typography variant="caption3" color="grayScale03">
                  퀴즈 PDF
                </Typography>
              </button>
              <button type="button" className="download-button" onClick={downloadAnswer}>
                <FileIcon />
                <Typography variant="caption3" color="grayScale03">
                  정답 PDF
                </Typography>
              </button>
            </DownloadButtonContainer>
            <CategoryItemContainer>
              {activeCategoryQuizItems.map((quizItem) => (
                <CategoryQuizItem
                  key={quizItem.categorizedProblemId}
                  quizItem={quizItem}
                  handleDeleteQuizItem={handleDeleteQuizItem}
                />
              ))}
            </CategoryItemContainer>
          </>
        )}
      </Container>
    );

  return (
    <Container>
      {activeCategorySummaryItems.length === 0 ? (
        <DefaultView />
      ) : (
        <>
          <DownloadButtonContainer>
            <button type="button" className="download-button" onClick={downloadSummary}>
              <FileIcon />
              <Typography variant="caption3" color="grayScale03">
                요약 PDF
              </Typography>
            </button>
          </DownloadButtonContainer>
          <CategoryItemContainer>
            {activeCategorySummaryItems.map((summaryItem) => (
              <CategorySummaryItem
                key={summaryItem.categorizedSummaryId}
                summaryItem={summaryItem}
                handleDeleteSummaryItem={handleDeleteSummaryItem}
              />
            ))}
          </CategoryItemContainer>
        </>
      )}
    </Container>
  );
}

export default CategoryItemsView;

const Container = styled.div`
  width: 100%;
  padding-top: 24px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0px 36px;

  .download-button {
    display: flex;
    gap: 4px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
  }
`;

const CategoryItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 9px 20px 9px 36px;

  overflow-y: scroll;
  ${Scrollbar}
`;
