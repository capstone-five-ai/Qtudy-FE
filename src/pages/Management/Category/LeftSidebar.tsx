import styled from 'styled-components';
import CategoryTabBar from '../../../components/TapBar/CategoryTabBar';
import { CategoryType } from '../../../types';
import Typography from '../../../components/Typography';
import { ReactComponent as PlusIcon } from '../../../assets/icons/icon-plus.svg';

interface LeftSidebarProps {
  categoryList: string[];
  activeCategory: string;
  activeTabBar: CategoryType;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setActiveTabBar: React.Dispatch<React.SetStateAction<CategoryType>>;
}

interface CategoryItemProps {
  itemName: string;
  active: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
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
        {categoryList.length > 0 ? (
          <div className="category-list">
            {categoryList.map((item) => (
              <CategoryItem itemName={item} active={activeCategory === item} setActiveCategory={setActiveCategory} />
            ))}
          </div>
        ) : (
          <div className="no-category">
            <Typography variant="detail" color="grayScale04">
              카테고리를 추가해주세요
            </Typography>
          </div>
        )}
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

function CategoryItem({ itemName, active, setActiveCategory }: CategoryItemProps) {
  return (
    <ItemContainer type="button" $active={active} onClick={() => setActiveCategory(itemName)}>
      <Typography variant="body2" color={active ? 'mainMintDark' : `grayScale02`}>
        {itemName}
      </Typography>
    </ItemContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 324px;
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
  text-align: left;
  padding: 8px 20px;
  cursor: pointer;
  border: none;
  border-left: 2px solid;
  border-color: ${(props) => (props.$active ? props.theme.colors.mainMint : 'transparent')};
  background: transparent;
`;
