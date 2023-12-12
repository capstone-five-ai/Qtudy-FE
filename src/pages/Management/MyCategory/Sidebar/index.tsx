import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { CategoryInfoType, CategoryType } from '../../../../types';
import CategoryTabBar from './CategoryTabBar';
import CategoryContainerTitle from './CategoryContainerTitle';
import Scrollbar from '../../../../components/Scrollbar';
import Category from './Category';
import CategoryApi from '../../../../api/CategoryApi';

interface SidebarProps {
  activeTabBar: CategoryType;
  categoryList: CategoryInfoType[];
  activeCategory: CategoryInfoType | null;
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryInfoType[]>>;
  setActiveTabBar: React.Dispatch<React.SetStateAction<CategoryType>>;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({
  activeTabBar,
  categoryList,
  activeCategory,
  setCategoryList,
  setActiveTabBar,
  setActiveCategory,
  setShowCategoryModal,
}: SidebarProps) {
  const handleAddCategory = () => {
    setShowCategoryModal(true);
  };

  const handleEditCategory = async (id: number, name: string) => {
    await CategoryApi.editCategory(id, name).then((data) => {
      const updatedCategoryList = categoryList.map((category) => {
        if (category.categoryId === data.categoryId) {
          return data;
        }
        return category;
      });
      setCategoryList(updatedCategoryList);
    });
  };

  const handleDeleteCategory = async (id: number) => {
    await CategoryApi.deleteCategory(id).then(() => {
      const updatedCategoryList = categoryList.filter((category) => category.categoryId !== id);
      setCategoryList(updatedCategoryList);
    });
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
                  active={activeCategory !== null && activeCategory.categoryId === category.categoryId}
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
