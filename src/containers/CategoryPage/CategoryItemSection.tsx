import PDFDownloadButton from '@/components/Button/PDFDownloadButton';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import CategoryQuizItem from '@/containers/CategoryPage/CategoryItem/CategoryQuizItem';
import CategorySummaryItem from '@/containers/CategoryPage/CategoryItem/CategorySummaryItem';
import NoItemSection from '@/containers/CategoryPage/NoItemSection';
import {
  QuizCategoryItemType,
  ServiceType,
  SummaryCategoryItemType,
} from '@/types/category.type';
import styled from 'styled-components';

interface CategoryItemSectionProps {
  activeType: ServiceType;
  activeCategoryId: string | null;
  activeCategoryItems: (QuizCategoryItemType | SummaryCategoryItemType)[]; // 타입 수정해야 함.
}

function CategoryItemSection({
  activeType,
  activeCategoryId,
  activeCategoryItems,
}: CategoryItemSectionProps) {
  function isQuizItemType(
    item: QuizCategoryItemType | SummaryCategoryItemType
  ): item is QuizCategoryItemType {
    return (item as QuizCategoryItemType).categorizedProblemId !== undefined;
  }

  const handleDeleteQuizItem = async (/* quizId: number */) => {
    /* await QuizCategoryApi.delete(quizId).then(() => {
      const newQuizItems = activeCategoryQuizItems.filter(
        (item) => item.categorizedProblemId !== quizId
      );
      setActiveCategoryQuizItems(newQuizItems);
    }); */
  };

  const handleDeleteSummaryItem = async (/* summaryId: number */) => {
    /* await SummaryCategoryApi.delete(summaryId).then(() => {
      const newSummaryItems = activeCategorySummaryItems.filter(
        (item) => item.categorizedSummaryId !== summaryId
      );
      setActiveCategorySummaryItems(newSummaryItems);
    }); */
  };

  if (activeCategoryId && activeCategoryItems.length === 0) {
    return <NoItemSection categoryType={activeType} />;
  }

  if (activeType === 'QUIZ')
    return (
      <StyledContainer>
        <StyledPDFButtonWrapper>
          <PDFDownloadButton
            fileId={Number(activeCategoryId)}
            pdfType="QUIZ"
            variant={2}
            type="CATEGORY"
          />
          <PDFDownloadButton
            fileId={Number(activeCategoryId)}
            pdfType="ANSWER"
            variant={2}
            type="CATEGORY"
          />
        </StyledPDFButtonWrapper>
        {activeCategoryItems.map((item, index) => (
          <CategoryQuizItem
            key={isQuizItemType(item) ? item.categorizedProblemId : index}
            quizItem={item as QuizCategoryItemType}
            handleDeleteItem={handleDeleteQuizItem}
          />
        ))}
      </StyledContainer>
    );

  if (activeType === 'SUMMARY')
    return (
      <StyledContainer>
        <StyledPDFButtonWrapper>
          <PDFDownloadButton
            fileId={Number(activeCategoryId)}
            pdfType="SUMMARY"
            variant={2}
            type="CATEGORY"
          />
        </StyledPDFButtonWrapper>
        {activeCategoryItems.map((item, index) => (
          <CategorySummaryItem
            key={isQuizItemType(item) ? index : item.categorizedSummaryId}
            summaryItem={item as SummaryCategoryItemType}
            handleDeleteItem={handleDeleteSummaryItem}
          />
        ))}
      </StyledContainer>
    );
}

export default CategoryItemSection;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px 24px 36px;

  overflow-y: scroll;
  ${Scrollbar}
`;

const StyledPDFButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
