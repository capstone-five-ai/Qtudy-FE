import styled from 'styled-components';
import { CategoryType } from '../../../../types';
import Typography from '../../../../components/Typography';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/icon-plus.svg';

interface CategoryContainerTitleProps {
  activeTabBar: CategoryType;
  handleAddCategory: () => void;
}
function CategoryContainerTitle({ activeTabBar, handleAddCategory }: CategoryContainerTitleProps) {
  return (
    <Container>
      <Typography variant="h4" color="grayScale02">
        {activeTabBar}
      </Typography>
      <button type="button" className="plus-button" onClick={handleAddCategory}>
        <PlusIcon />
        <Typography variant="caption3" color="mainMintDark">
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

    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;

    path {
      fill: ${(props) => props.theme.colors.mainMintDark};
    }
  }
`;

export default CategoryContainerTitle;
