import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg';
import NewCategoryModal from '@/components/Modal/NewCategoryModal';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import Typography from '@/components/Typography/Typography';
import { CATEGORY_TYPE } from '@/constants';
import Category from '@/containers/CategoryPage/Category';
import CategoryTabBar from '@/containers/CategoryPage/CategoryTabBar';
import { CategoryType, ServiceType } from '@/types/category.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategorySidebarProps {
  currentType: ServiceType;
  categories: CategoryType[];
  activeCategoryId: string | null;
  refetchQuizCategory: () => void;
  refetchSummaryCategory: () => void;
}

function CategorySidebar({
  currentType,
  categories,
  activeCategoryId,
  refetchQuizCategory,
  refetchSummaryCategory,
}: CategorySidebarProps) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    setShowCategoryModal(true);
  };

  return (
    <>
      <StyledContainer>
        <CategoryTabBar currentType={currentType} />
        <StyleTitleContainer>
          <Typography variant="h4" color="grayScale02">
            {CATEGORY_TYPE[currentType]}
          </Typography>
          <button
            type="button"
            className="plus-button"
            onClick={handleAddCategory}
          >
            <PlusIcon />
            <Typography variant="caption3" color="grayScale03">
              카테고리 추가
            </Typography>
          </button>
        </StyleTitleContainer>
        <StyledCategoryListContainer>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Category
                key={category.categoryId}
                category={category}
                active={activeCategoryId === String(category.categoryId)}
                onClick={() => {
                  const searchParams = new URLSearchParams(location.search);
                  searchParams.set('categoryId', String(category.categoryId));
                  navigate(`${location.pathname}?${searchParams.toString()}`);
                }}
                refetchCategory={() => {
                  currentType === 'QUIZ'
                    ? refetchQuizCategory()
                    : refetchSummaryCategory();
                }}
              />
            ))
          ) : (
            <span className="no-category">카테고리를 추가해주세요</span>
          )}
        </StyledCategoryListContainer>
      </StyledContainer>
      {showCategoryModal && (
        <NewCategoryModal
          onClose={() => {
            setShowCategoryModal(false);
          }}
          onSubmit={() => {
            currentType === 'QUIZ'
              ? refetchQuizCategory()
              : refetchSummaryCategory();
          }}
          categoryType={currentType}
        />
      )}
    </>
  );
}

export default CategorySidebar;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 340px;
`;

const StyleTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 16px;

  .plus-button {
    display: flex;
    align-items: center;
    gap: 8px;

    path {
      fill: ${({ theme }) => theme.colors.grayScale03};
    }
  }
`;

const StyledCategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow-y: scroll;
  ${Scrollbar}

  .no-category {
    ${({ theme }) => theme.typography.detail};
    color: ${({ theme }) => theme.colors.grayScale04};
    margin-top: 84px;
    text-align: center;
  }
`;
