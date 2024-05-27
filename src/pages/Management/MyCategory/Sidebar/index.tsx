import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '../../../../components/Typography';
import { CategoryInfoType } from '../../../../types';
import CategoryTabBar from './CategoryTabBar';
import CategoryContainerTitle from './CategoryContainerTitle';
import Category from './Category';
import CategoryApi from '../../../../api/CategoryApi';
import { CategoryType } from '../../../../types/category.type';
import Scrollbar from '../../../../components/Scrollbar';

interface SidebarProps {
  currentType: keyof CategoryType;
  categoryList: CategoryInfoType[];
  activeCategoryId: string;
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryInfoType[]>>;
  setActiveCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({
  currentType,
  categoryList,
  activeCategoryId,
  setActiveCategoryName,
  setCategoryList,
  setShowCategoryModal,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

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

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('categoryId');

      navigate(`${location.pathname}?${searchParams.toString()}`);
    });
  };

  return (
    <Container>
      <CategoryTabBar currentType={currentType} />
      <CategoryContainerTitle currentType={currentType} handleAddCategory={handleAddCategory} />
      <CategoryListContainer>
        {categoryList.length > 0 ? (
          <>
            {categoryList.map((category) => (
              <Category
                key={category.categoryId}
                category={category}
                active={activeCategoryId === String(category.categoryId)}
                handleEditCategory={handleEditCategory}
                handleDeleteCategory={handleDeleteCategory}
                setActiveCategoryName={setActiveCategoryName}
              />
            ))}
          </>
        ) : (
          <div className="no-category">
            <Typography variant="detail" color="grayScale04">
              카테고리를 추가해주세요
            </Typography>
          </div>
        )}
      </CategoryListContainer>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 340px;
  height: 572px;

  & > div:nth-child(1) {
    margin-right: 16px;
    margin-bottom: 16px;
  }
`;

const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  overflow-y: scroll;
  ${Scrollbar}

  .no-category {
    padding: 100px 0px;
    text-align: center;
  }
`;
