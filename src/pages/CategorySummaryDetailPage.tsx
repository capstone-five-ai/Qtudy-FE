import SummaryCheckForm from '@/components/Form/SummaryCheckForm';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import CategorySidebar from '@/containers/CategoryDetailPage/CategorySidebar';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import { useGetCategorySummaryItem } from '@/hooks/useGetSummary';
import useRedirect from '@/hooks/useRedirect';
import authState from '@/recoils/atoms/authState';
import { CategorySummaryItem } from '@/types/summary.type';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function CategorySummaryDetailPage() {
  const isAuthenticated = useRecoilValue(authState);
  const [params] = useSearchParams();
  const categoryId = Number(params.get('categoryId'));
  const summaryId = Number(params.get('id'));
  const { data: summaryData, error } = useGetCategorySummaryItem(summaryId);
  const [currentSummary, setCurrentSummary] = useState<CategorySummaryItem>();
  const [isWriter, setIsWriter] = useState(false);
  const navigate = useNavigate();
  const redirect = useRedirect();

  useEffect(() => {
    if (summaryData) {
      setCurrentSummary(summaryData.response);
      setIsWriter(summaryData.isWriter);
    }
  }, [summaryData]);

  useEffect(() => {
    if (isNaN(categoryId) || isNaN(summaryId) || error)
      redirect('/management/category');
  }, []);

  return (
    <ContentWrapper>
      <StyledContent $isWriter={isWriter}>
        {isAuthenticated && (
          <TopButtonBar
            handleReturnToList={() => {
              navigate(
                `/management/category?type=summary&categoryId=${categoryId}`
              );
            }}
            handleEdit={() => {
              navigate(
                `/management/category/edit/summary?categoryId=${categoryId}&id=${summaryId}`,
                {
                  state: { summaryData: currentSummary },
                }
              );
            }}
          />
        )}
        {currentSummary && <SummaryCheckForm summary={currentSummary} />}
      </StyledContent>
      <CategorySidebar
        isAuthenticated={isAuthenticated}
        contentType="SUMMARY"
        contentSummary={currentSummary}
        categoryId={categoryId}
        contentId={currentSummary ? currentSummary.summaryId : -1}
      />
    </ContentWrapper>
  );
}

export default CategorySummaryDetailPage;

const StyledContent = styled.div<{ $isWriter: boolean }>`
  flex: 1;
  padding: 0 20px 40px 40px;
  padding-top: ${({ $isWriter }) => ($isWriter ? '24px' : '40px')};

  display: flex;
  flex-direction: column;
`;
