import PlainButton from '@/components/Button/PlainButton';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import { CATEGORY_TYPE } from '@/constants';
import CategoryItemSection from '@/containers/CategoryPage/CategoryItemSection';
import CategorySidebar from '@/containers/CategoryPage/CategorySidebar';
import { useGetCategoryDetailList } from '@/hooks/useGetCategory';
import useRedirect from '@/hooks/useRedirect';
import { CategoryType, ServiceType } from '@/types/category.type';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

interface CategorySectionProps {
  refetchQuizCategoryList: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  refetchSummaryCategoryList: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  quizCategories: CategoryType[];
  summaryCategories: CategoryType[];
}

function CategorySection({
  refetchQuizCategoryList,
  refetchSummaryCategoryList,
  quizCategories,
  summaryCategories,
}: CategorySectionProps) {
  const redirect = useRedirect();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type')?.toUpperCase() as ServiceType | undefined;
  const activeCategoryId = params.get('categoryId');

  const {
    data: currentCategoryDetailList,
    refetch: refetchCurrentCategoryDetailList,
  } = useGetCategoryDetailList(activeCategoryId ?? '');

  useEffect(() => {
    if (activeCategoryId) {
      refetchCurrentCategoryDetailList().then((result) => {
        if (result.error) {
          redirect(`/management/category?type=${type?.toLowerCase()}`);
        }
      });
    }
  }, [activeCategoryId]);

  return (
    <StyledContainer>
      <CategorySidebar
        currentType={type ?? 'QUIZ'}
        categories={type === 'QUIZ' ? quizCategories : summaryCategories}
        activeCategoryId={activeCategoryId}
        refetchQuizCategory={refetchQuizCategoryList}
        refetchSummaryCategory={refetchSummaryCategoryList}
      />
      <StyledContentWrapper>
        {activeCategoryId && type && currentCategoryDetailList ? (
          <>
            <CategoryItemSection
              activeType={type}
              activeCategoryId={activeCategoryId}
              activeCategoryName={currentCategoryDetailList.categoryName}
              activeCategoryItems={
                currentCategoryDetailList
                  ? type === 'QUIZ'
                    ? currentCategoryDetailList.categorizedProblemResponses.data
                    : type === 'SUMMARY'
                      ? currentCategoryDetailList.categorizedSummaryResponses
                          .data
                      : []
                  : []
              }
              refetchCategoryDetail={refetchCurrentCategoryDetailList}
            />
            <StyledButtonWrapper>
              <PlainButton
                size="large"
                onClick={() => {
                  if (type === 'QUIZ') navigate('/quiz/ai');
                  else navigate('/summary/ai');
                }}
              >
                카테고리에 {CATEGORY_TYPE[type]} 추가
              </PlainButton>
            </StyledButtonWrapper>
          </>
        ) : (
          <div className="no-category">카테고리를 선택해주세요</div>
        )}
      </StyledContentWrapper>
    </StyledContainer>
  );
}

export default CategorySection;

const StyledContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  width: 800px;
  position: relative;

  .no-category {
    width: 100%;
    ${({ theme }) => theme.typography.detail};
    color: ${({ theme }) => theme.colors.grayScale04};

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StyledButtonWrapper = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);
`;
