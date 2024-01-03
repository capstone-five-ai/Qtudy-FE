import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import CategoryItemDate from './CategoryItemDate';

interface CategoryItemContainerProps {
  itemId: number;
  itemType: string;
  createDate: string;
  updateDate: string;
  children: React.ReactNode;
  handleDeleteItem: () => void;
}
function CategoryItemContainer({
  itemId,
  itemType,
  createDate,
  updateDate,
  children,
  handleDeleteItem,
}: CategoryItemContainerProps) {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/management/mycategory/detail?category=${itemType}&id=${itemId}`);
      }}
      $itemType={itemType}
    >
      <ItemContainer>
        <ChildrenContainer>{children}</ChildrenContainer>
        <DeleteIcon
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteItem();
          }}
        />
      </ItemContainer>
      <CategoryItemDate createDate={createDate} updateDate={updateDate} />
    </Container>
  );
}

const Container = styled.div<{ $itemType: string }>`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 728px;
  padding: ${(props) => (props.$itemType === 'quiz' ? '18.5px' : '19.5px 19px')};
  border-radius: 8px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 12px 0px rgba(189, 189, 189, 0.2);
  background: ${(props) => props.theme.colors.grayScale09};
  cursor: pointer;

  .icon {
    flex-shrink: 0;
    cursor: pointer;
    path {
      stroke: transparent;
    }
  }

  &:hover {
    border-color: rgba(62, 215, 205, 0.4);
    box-shadow: 0px 0px 12px 0px rgba(62, 215, 205, 0.12);

    path {
      stroke: ${(props) => props.theme.colors.grayScale04};
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 100%;
  overflow: hidden;
`;

export default CategoryItemContainer;
