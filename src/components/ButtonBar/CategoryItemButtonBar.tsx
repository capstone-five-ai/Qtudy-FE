import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../Typography';
import { ReactComponent as EditIcon } from '../../assets/icons/edit_mint.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/complete.svg';

interface CategoryItemButtonBarProps {
  isEdit?: boolean;
  handleComplete?: () => void;
  handleReturnToList?: () => void;
  handleEdit?: () => void;
}

CategoryItemButtonBar.defaultProps = {
  isEdit: false,
  handleComplete: () => {},
  handleReturnToList: () => {},
  handleEdit: () => {},
};

function CategoryItemButtonBar({
  isEdit = false,
  handleComplete,
  handleReturnToList,
  handleEdit,
}: CategoryItemButtonBarProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <StyledContainer>
      {isEdit ? (
        <>
          <StyledButton type="button" onClick={handleCancel}>
            <Typography variant="button" color="grayScale03">
              편집 취소
            </Typography>
          </StyledButton>
          <StyledButton type="button" onClick={handleComplete}>
            <CheckIcon />
            <Typography variant="button" color="grayScale03">
              편집 완료
            </Typography>
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton type="button" onClick={handleReturnToList}>
            <Typography variant="button" color="grayScale03">
              목록으로
            </Typography>
          </StyledButton>
          <StyledButton type="button" onClick={handleEdit}>
            <EditIcon />
            <Typography variant="button" color="grayScale03">
              편집하기
            </Typography>
          </StyledButton>
        </>
      )}
    </StyledContainer>
  );
}

export default CategoryItemButtonBar;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 36px;
  margin-bottom: 24px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;
