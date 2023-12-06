import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { CategoryInfoType, CategoryListInfoType, CategoryType } from '../../../../types';
import CategoryTabBar from './CategoryTabBar';
import CategoryContainerTitle from './CategoryContainerTitle';
import Scrollbar from '../../../../components/Scrollbar';
import Category from './Category';

interface SidebarProps {
  activeTabBar: CategoryType;
  categoryList: CategoryInfoType[];
  activeCategory: CategoryInfoType | null;
  setActiveTabBar: React.Dispatch<React.SetStateAction<CategoryType>>;
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryListInfoType>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
}

function Sidebar({
  activeTabBar,
  categoryList,
  activeCategory,
  setActiveTabBar,
  setCategoryList,
  setActiveCategory,
}: SidebarProps) {
  const handleAddCategory = () => {
    // TODO: 카테고리 추가 API
    setCategoryList({ quiz: [], summary: [] });
  };

  const handleEditCategory = (id: number, name: string) => {
    // TODO: 카테고리 편집 API
    console.log(id);
    console.log(name);
  };

  const handleDeleteCategory = (id: number, name: string) => {
    // TODO: 카테고리 삭제 API
    console.log(id);
    console.log(name);
  };

  return (
    <Container>
      <CategoryTabBar activeTabBar={activeTabBar} setActiveTabBar={setActiveTabBar} />
      <CategoryContainer>
        <CategoryContainerTitle activeTabBar={activeTabBar} handleAddCategory={handleAddCategory} />
        <CategoryListContainer>
          {categoryList.length > 0 ? (
            <div className="category-list">
              {categoryList.map((category) => (
                <Category
                  key={category.categoryId}
                  category={category}
                  active={activeCategory !== null && activeCategory.categoryName === category.categoryName}
                  setActiveCategory={setActiveCategory}
                  handleEditCategory={handleEditCategory}
                  handleDeleteCategory={handleDeleteCategory}
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

export default Sidebar;

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

const CategoryListContainer = styled.div`
  max-height: calc(100vh - 65px - 190px - 124px);
  overflow-y: scroll;
  ${Scrollbar}
`;
