import styled from 'styled-components';
import CategoryTabBar from '../../../components/TapBar/CategoryTabBar';
import { CategoryInfoType, CategoryType } from '../../../types';
import Typography from '../../../components/Typography';
import { ReactComponent as PlusIcon } from '../../../assets/icons/icon-plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/icon-edit.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/icon-trash.svg';
import Scrollbar from '../../../components/Scrollbar';

interface LeftSidebarProps {
  categoryList: CategoryInfoType[];
  activeCategory: CategoryInfoType | null;
  activeTabBar: CategoryType;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
  setActiveTabBar: React.Dispatch<React.SetStateAction<CategoryType>>;
}

interface CategoryItemProps {
  category: CategoryInfoType;
  active: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
}

function LeftSidebar({
  categoryList,
  activeCategory,
  activeTabBar,
  setActiveCategory,
  setActiveTabBar,
}: LeftSidebarProps) {
  return (
    <Container>
      <CategoryTabBar activeTabBar={activeTabBar} setActiveTabBar={setActiveTabBar} />
      <CategoryContainer>
        <CategoryTitle />
        <CategoryListContainer>
          {categoryList.length > 0 ? (
            <div className="category-list">
              {categoryList.map((item) => (
                <CategoryItem
                  category={item}
                  active={activeCategory !== null && activeCategory.name === item.name}
                  setActiveCategory={setActiveCategory}
                />
              ))}
            </div>
          ) : (
            <div className="no-category">
              <Typography variant="detail" color="grayScale04">
                카테고리를 추가해주세요
              </Typography>
            </div>
          )}
        </CategoryListContainer>
      </CategoryContainer>
    </Container>
  );
}

export default LeftSidebar;

function CategoryTitle() {
  const handleAddCategory = () => {
    // TODO: 카테고리 추가 API 연결
  };

  return (
    <TitleContainer>
      <Typography variant="h4" color="grayScale02">
        퀴즈
      </Typography>
      <button type="button" className="plus-button" onClick={handleAddCategory}>
        <PlusIcon />
        <Typography variant="caption3" color="mainMintDark">
          카테고리 추가
        </Typography>
      </button>
    </TitleContainer>
  );
}

function CategoryItem({ category, active, setActiveCategory }: CategoryItemProps) {
  const handleEditCategory = () => {
    // TODO: 카테고리 편집 API
  };

  const handleDeleteCategory = () => {
    // TODO: 카테고리 삭제 API
  };

  return (
    <ItemContainer type="button" $active={active} onClick={() => setActiveCategory(category)}>
      <Typography variant="body2" color={active ? 'mainMintDark' : `grayScale02`}>
        {category.name}
      </Typography>
      {active && (
        <div className="icon-list">
          <EditIcon onClick={handleEditCategory} style={{ cursor: 'pointer' }} />
          <TrashIcon onClick={handleDeleteCategory} style={{ cursor: 'pointer' }} />
        </div>
      )}
    </ItemContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 340px;

  & > div:nth-child(1) {
    margin-right: 16px;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  }

  .no-category {
    padding: 100px 0px;
    text-align: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 16px;

  .plus-button {
    display: flex;
    align-items: center;
    gap: 8px;

    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    path {
      fill: ${(props) => props.theme.colors.mainMintDark};
    }
  }
`;

const ItemContainer = styled.button<{ $active: boolean }>`
  display: flex;
  justify-content: space-between;
  text-align: left;
  padding: 8px 0px 8px 20px;

  border: none;
  border-left: 2px solid;
  border-color: ${(props) => (props.$active ? props.theme.colors.mainMint : 'transparent')};
  background: transparent;

  & > div:nth-child(1) {
    cursor: pointer;
  }

  .icon-list {
    display: flex;
    gap: 16px;
  }
`;

const CategoryListContainer = styled.div`
  max-height: calc(100vh - 65px - 190px - 124px);
  overflow-y: scroll;
  ${Scrollbar}
`;
