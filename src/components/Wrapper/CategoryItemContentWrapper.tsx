import styled from 'styled-components';
import Scrollbar from '../Scrollbar';
import Typography from '../Typography';
import { ReactComponent as EditIcon } from '../../assets/icons/icon-edit.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';

interface CategoryItemContentWrapperProps {
  isEdit?: boolean;
  handleMoveToList?: () => void;
  handleEdit?: () => void;
  handleCancelEdit?: () => void;
  handleFinishEdit?: () => void;
  children: React.ReactNode;
}

function CategoryItemContentWrapper({
  isEdit = false,
  handleMoveToList,
  handleEdit,
  handleCancelEdit,
  handleFinishEdit,
  children,
}: CategoryItemContentWrapperProps) {
  return (
    <Container>
      <div className="button-container">
        {isEdit ? (
          <>
            <Button type="button" onClick={handleMoveToList}>
              <Typography variant="button" color="grayScale03">
                목록으로
              </Typography>
            </Button>
            <Button type="button" onClick={handleEdit}>
              <EditIcon />
              <Typography variant="button" color="grayScale03">
                편집하기
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Button type="button" onClick={handleCancelEdit}>
              <Typography variant="button" color="grayScale03">
                편집 취소
              </Typography>
            </Button>
            <Button type="button" onClick={handleFinishEdit}>
              <CheckIcon />
              <Typography variant="button" color="grayScale03">
                편집 완료
              </Typography>
            </Button>
          </>
        )}
      </div>
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
}

CategoryItemContentWrapper.defaultProps = {
  isEdit: false,
  handleMoveToList: () => {},
  handleEdit: () => {},
  handleCancelEdit: () => {},
  handleFinishEdit: () => {},
};

export default CategoryItemContentWrapper;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;

  margin: 24px 0px;
  padding-left: 40px;
  padding-right: 20px;

  .button-container {
    display: flex;
    justify-content: space-between;
    padding-right: 16px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
`;

const ChildrenContainer = styled.div`
  overflow-y: scroll;
  ${Scrollbar}
`;
