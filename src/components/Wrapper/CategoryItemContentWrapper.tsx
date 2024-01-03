import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../Typography';
import { ReactComponent as EditIcon } from '../../assets/icons/edit_mint.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/complete.svg';

interface CategoryItemContentWrapperProps {
  isEdit?: boolean;
  handleMoveToList?: () => void;
  handleEdit?: () => void;
  handleFinishEdit?: () => void;
  children: React.ReactNode;
}

function CategoryItemContentWrapper({
  isEdit = false,
  handleMoveToList,
  handleEdit,
  handleFinishEdit,
  children,
}: CategoryItemContentWrapperProps) {
  const navigate = useNavigate();

  const handleCancelEdit = () => {
    navigate(-1);
  };

  return (
    <Container>
      <InnerContainer>
        <div className="button-container">
          {isEdit ? (
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
          ) : (
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
          )}
        </div>
        <ChildrenContainer>{children}</ChildrenContainer>
      </InnerContainer>
    </Container>
  );
}

CategoryItemContentWrapper.defaultProps = {
  isEdit: false,
  handleMoveToList: () => {},
  handleEdit: () => {},
  handleFinishEdit: () => {},
};

export default CategoryItemContentWrapper;

const Container = styled.div`
  flex-grow: 1;
  heigth: 100%;
  padding: 24px 40px;

  .button-container {
    display: flex;
    justify-content: space-between;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 44px);
`;
