import styled from 'styled-components';
import React from 'react';
import CategoryQuizItem from './CategoryQuizItem';
import CategorySummaryItem from './CategorySummaryItem';
import { CategoryQuizItemsType } from '../../../types/quiz.type';
import { CategorySummaryItemsType } from '../../../types/summary.type';
import NoItem from './NoItem';
import QuizCategoryApi from '../../../api/QuizCategoryApi';
import SummaryCategoryApi from '../../../api/SummaryCategoryApi';
import PDFButton from '../../../components/Button/PDFButton';

interface CategoryItemsViewProps {
  activeTabBar: string;
  activeCategoryId: string;
  activeCategoryName: string;
  activeCategoryQuizItems: CategoryQuizItemsType[];
  activeCategorySummaryItems: CategorySummaryItemsType[];
  setActiveCategoryQuizItems: React.Dispatch<React.SetStateAction<CategoryQuizItemsType[]>>;
  setActiveCategorySummaryItems: React.Dispatch<React.SetStateAction<CategorySummaryItemsType[]>>;
}

function CategoryItemsView({
  activeTabBar,
  activeCategoryId,
  activeCategoryName,
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
            {activeCategoryId !== '' && (
              <DownloadButtonContainer>
                <PDFButton
                  label="퀴즈"
                  variant={2}
                  fileId={Number(activeCategoryId)}
                  pdfType="PROBLEM"
                  type="category"
                  fileName={`${activeCategoryName}_QUIZ`}
                />
                <PDFButton
                  label="정답"
                  variant={2}
                  fileId={Number(activeCategoryId)}
                  pdfType="ANSWER"
                  type="category"
                  fileName={`${activeCategoryName}_ANSWER`}
                />
              </DownloadButtonContainer>
            )}
            <CategoryItemWrapper>
              {activeCategoryQuizItems.map((quizItem) => (
                <CategoryQuizItem
                  key={quizItem.categorizedProblemId}
                  quizItem={quizItem}
                  handleDeleteQuizItem={handleDeleteQuizItem}
                />
              ))}
            </CategoryItemWrapper>
          </>
        )}
      </Container>
    );

  return (
    <Container>
      {activeCategorySummaryItems.length === 0 ? (
        <NoItem categoryType={activeTabBar} />
      ) : (
        <CategoryItemWrapper>
          {activeCategorySummaryItems.map((summaryItem) => (
            <CategorySummaryItem
              key={summaryItem.categorizedSummaryId}
              summaryItem={summaryItem}
              handleDeleteSummaryItem={handleDeleteSummaryItem}
            />
          ))}
        </CategoryItemWrapper>
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
`;

const CategoryItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 9px 20px 9px 36px;
`;
