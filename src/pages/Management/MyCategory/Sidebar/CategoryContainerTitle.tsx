import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus.svg';
import { CategoryTypeMapping } from '../../../../types/category.type';
import { CATEGORY_TYPE_MAPPING } from '../../../../constants';

interface CategoryContainerTitleProps {
  currentType: keyof CategoryTypeMapping;
  handleAddCategory: () => void;
}
function CategoryContainerTitle({ currentType, handleAddCategory }: CategoryContainerTitleProps) {
  return (
    <Container>
      <Typography variant="h4" color="grayScale02">
        {CATEGORY_TYPE_MAPPING[currentType].ko}
      </Typography>
      <button type="button" className="plus-button" onClick={handleAddCategory}>
        <PlusIcon />
        <Typography variant="caption3" color="grayScale03">
          카테고리 추가
        </Typography>
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 16px;

  .plus-button {
    display: flex;
    align-items: center;
    gap: 8px;

    height: min-content;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    path {
      fill: #757575;
    }
  }
`;

export default CategoryContainerTitle;
