import styled from 'styled-components';
import React from 'react';
import { CategoryQuizItemsType, CategorySummaryItemsType, CategoryType } from '../../../types';
import CategoryQuizItem from './CategoryQuizItem';
import DefaultView from './DefaultView';
import Scrollbar from '../../../components/Scrollbar';
import { ReactComponent as FileIcon } from '../../../assets/icons/icon-file.svg';
import Typography from '../../../components/Typography';
import CategorySummaryItem from './CategorySummaryItem';

interface CategoryItemsViewProps {
  activeTabBar: CategoryType;
  activeCategoryQuizItems: CategoryQuizItemsType[];
  activeCategorySummaryItems: CategorySummaryItemsType[];
  setActiveCategoryQuizItems: React.Dispatch<React.SetStateAction<CategoryQuizItemsType[]>>;
  setActiveCategorySummaryItems: React.Dispatch<React.SetStateAction<CategorySummaryItemsType[]>>;
}

function CategoryItemsView({
  activeTabBar,
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

  if (activeTabBar === '퀴즈')
    return (
      <Container>
        {activeCategoryQuizItems.length === 0 ? (
          <DefaultView />
        ) : (
          <>
            <DownloadButtonContainer>
              <div className="download-button">
                <FileIcon />
                <Typography variant="caption3" color="grayScale03">
                  퀴즈 PDF
                </Typography>
              </div>
              <div className="download-button">
                <FileIcon />
                <Typography variant="caption3" color="grayScale03">
                  정답 PDF
                </Typography>
              </div>
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
            <div className="download-button">
              <FileIcon />
              <Typography variant="caption3" color="grayScale03">
                요약 PDF
              </Typography>
            </div>
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
