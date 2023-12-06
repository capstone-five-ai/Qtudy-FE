import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { ReactComponent as EditIcon } from '../../../../assets/icons/icon-edit.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/icon-trash.svg';
import { CategoryInfoType } from '../../../../types';

interface CategoryProps {
  category: CategoryInfoType;
  active: boolean;
  setActiveCategory: React.Dispatch<React.SetStateAction<CategoryInfoType | null>>;
  handleEditCategory: (id: number, name: string) => void;
  handleDeleteCategory: (id: number, name: string) => void;
}

function Category({ category, active, setActiveCategory, handleEditCategory, handleDeleteCategory }: CategoryProps) {
  return (
    <ItemContainer type="button" $active={active} onClick={() => setActiveCategory(category)}>
      <Typography variant="body2" color={active ? 'mainMintDark' : `grayScale02`}>
        {category.categoryName}
      </Typography>
      {active && (
        <div className="icon-list">
          <EditIcon
            onClick={() => handleEditCategory(category.categoryId, category.categoryName)}
            style={{ cursor: 'pointer' }}
          />
          <TrashIcon
            onClick={() => handleDeleteCategory(category.categoryId, category.categoryName)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}
    </ItemContainer>
  );
}

export default Category;

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
