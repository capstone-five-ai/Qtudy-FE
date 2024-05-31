import Scrollbar from '@/components/Scrollbar/Scrollbar';
import NoItemSection from '@/containers/CategoryPage/NoItemSection';
import { ServiceType } from '@/types/category.type';
import { useEffect } from 'react';
import styled from 'styled-components';

interface CategoryItemSectionProps {
  activeType: ServiceType;
  activeCategoryId: string;
}

function CategoryItemSection({
  activeType,
  activeCategoryId,
}: CategoryItemSectionProps) {
  //const [quizItems, setQuizItems] = useState([{}]);
  const quizItems = [{}];
  //const [summaryItems, setSummaryItems] = useState([{}]);
  const summaryItems = [{}];

  useEffect(() => {
    /* fetchItems(activeType, activeCategoryId); */
  }, [activeType, activeCategoryId]);

  /* const handleDeleteQuizItem = async (quizId: number) => {
    await QuizCategoryApi.delete(quizId).then(() => {
      const newQuizItems = activeCategoryQuizItems.filter(
        (item) => item.categorizedProblemId !== quizId
      );
      setActiveCategoryQuizItems(newQuizItems);
    });
  }; */

  /* const handleDeleteSummaryItem = async (summaryId: number) => {
    await SummaryCategoryApi.delete(summaryId).then(() => {
      const newSummaryItems = activeCategorySummaryItems.filter(
        (item) => item.categorizedSummaryId !== summaryId
      );
      setActiveCategorySummaryItems(newSummaryItems);
    });
  }; */

  if (quizItems.length + summaryItems.length === 0) {
    return <NoItemSection categoryType={activeType} />;
  }

  if (activeType === 'QUIZ')
    return (
      <StyledContainer>
        <StyledPDFButtonWrapper>
          {/* <PDFDownloadButton pdfType="QUIZ" variant={2} />
          <PDFDownloadButton pdfType="ANSWER" variant={2} /> */}
        </StyledPDFButtonWrapper>
        {/* {quizItems.map((item) => (
          <CategoryQuizItem
            quizItem={item}
            handleDeleteItem={handleDeleteQuizItem}
          />
        ))} */}
      </StyledContainer>
    );

  return (
    <StyledContainer>
      {/* <StyledPDFButtonWrapper>
        <PDFDownloadButton pdfType="SUMMARY" variant={2} />
  </StyledPDFButtonWrapper> */}
      {/* {summaryItems.map((item) => (
        <CategorySummaryItem
          summaryItem={item}
          handleDeleteItem={handleDeleteSummaryItem}
        />
      ))} */}
    </StyledContainer>
  );
}

export default CategoryItemSection;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 9px 20px 9px 36px;

  overflow-y: scroll;
  ${Scrollbar}
`;

const StyledPDFButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
