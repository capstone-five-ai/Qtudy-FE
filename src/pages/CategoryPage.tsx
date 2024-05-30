import PlainButton from '@/components/Button/PlainButton';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import { CATEGORY_TYPE } from '@/constants';
import CategoryItemSection from '@/containers/CategoryPage/CategoryItemSection';
import CategorySidebar from '@/containers/CategoryPage/CategorySidebar';
import NoCategorySection from '@/containers/CategoryPage/NoCategorySection';
import { CategoryInfoType, ServiceType } from '@/types/category.type';
import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function CategoryPage() {
  const [params] = useSearchParams();
  const type = params.get('type')?.toUpperCase() as ServiceType | undefined;
  const activeCategoryId = params.get('categoryId');
  const [quizCategories, setQuizCategories] = useState<CategoryInfoType[]>([
    { categoryId: 1, categoryName: '카테고리', categoryType: '퀴즈' },
    { categoryId: 2, categoryName: '카테고리2', categoryType: '요약' },
  ]);
  const [summaryCategories, setSummaryCategories] = useState<
    CategoryInfoType[]
  >([]);
  const navigate = useNavigate();

  if (!type && quizCategories.length + summaryCategories.length === 0)
    return <NoCategorySection />;

  if (!type) return <Navigate to="/management/category?type=quiz" replace />;

  return (
    <StyledContainer>
      <CategorySidebar
        currentType={type}
        categories={type === 'QUIZ' ? quizCategories : summaryCategories}
        activeCategoryId={activeCategoryId}
      />
      <StyledContentWrapper>
        {activeCategoryId && type ? (
          <>
            <CategoryItemSection
              activeType={type}
              activeCategoryId={activeCategoryId}
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

export default CategoryPage;

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
