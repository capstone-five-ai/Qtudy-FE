import styled from 'styled-components';
import React from 'react';
import CategoryQuizItem from './CategoryQuizItem';
import Scrollbar from '../../../components/Scrollbar';
import CategorySummaryItem from './CategorySummaryItem';
import { CategoryInfoType, CategoryType } from '../../../types';
import { CategoryQuizItemsType } from '../../../types/quiz.type';
import { CategorySummaryItemsType } from '../../../types/summary.type';
import NoItem from './NoItem';
import QuizCategoryApi from '../../../api/QuizCategoryApi';
import SummaryCategoryApi from '../../../api/SummaryCategoryApi';
import PDFButton from '../../../components/Button/PDFButton';

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
  const handleDeleteQuizItem = async (quizId: number) => {
    await QuizCategoryApi.delete(quizId).then(() => {
      const newQuizItems = activeCategoryQuizItems.filter((item) => item.categorizedProblemId !== quizId);
      setActiveCategoryQuizItems(newQuizItems);
    });
  };

  const handleDeleteSummaryItem = async (summaryId: number) => {
    await SummaryCategoryApi.delete(summaryId).then(() => {
      const newSummaryItems = activeCategorySummaryItems.filter((item) => item.categorizedSummaryId !== summaryId);
      setActiveCategorySummaryItems(newSummaryItems);
    });
  };

  if (activeTabBar === '퀴즈')
    return (
      <Container>
        {activeCategoryQuizItems.length === 0 ? (
          <NoItem categoryType={activeTabBar} />
        ) : (
          <>
            {activeCategory && (
              <DownloadButtonContainer>
                <PDFButton
                  label="퀴즈"
                  variant={2}
                  fileId={activeCategory.categoryId}
                  pdfType="PROBLEM"
                  type="category"
                  fileName={`${activeCategory.categoryName}_QUIZ`}
                />
                <PDFButton
                  label="정답"
                  variant={2}
                  fileId={activeCategory.categoryId}
                  pdfType="ANSWER"
                  type="category"
                  fileName={`${activeCategory.categoryName}_ANSWER`}
                />
              </DownloadButtonContainer>
            )}
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
        <NoItem categoryType={activeTabBar} />
      ) : (
        <CategoryItemContainer>
          {activeCategorySummaryItems.map((summaryItem) => (
            <CategorySummaryItem
              key={summaryItem.categorizedSummaryId}
              summaryItem={summaryItem}
              handleDeleteSummaryItem={handleDeleteSummaryItem}
            />
          ))}
        </CategoryItemContainer>
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
