import { ReactComponent as CheckIcon } from '@/assets/icons/complete.svg';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

interface TopButtonBarProps {
  isEdit?: boolean;
  disabledComplete?: boolean;
  handleComplete?: () => void;
  handleReturnToList?: () => void;
  handleEdit?: () => void;
  handleCancel?: () => void;
  margin?: string;
}

function TopButtonBar({
  isEdit = false,
  disabledComplete = false,
  handleComplete,
  handleReturnToList,
  handleEdit,
  handleCancel,
  margin,
}: TopButtonBarProps) {
  return (
    <StyledContainer $margin={margin}>
      {isEdit ? (
        <>
          <StyledButton type="button" onClick={handleCancel}>
            <Typography variant="button" color="grayScale03">
              편집 취소
            </Typography>
          </StyledButton>
          <StyledButton
            type="button"
            onClick={handleComplete}
            disabled={disabledComplete}
          >
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
            <EditIcon className="icon" />
            <Typography variant="button" color="grayScale03">
              편집하기
            </Typography>
          </StyledButton>
        </>
      )}
    </StyledContainer>
  );
}

export default TopButtonBar;

const StyledContainer = styled.div<{ $margin: string | undefined }>`
  display: flex;
  justify-content: space-between;
  width: 724px;
  margin-bottom: ${({ $margin }) => $margin || '24px'};
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    path {
      fill: ${({ theme }) => theme.colors.mainMintDark};
    }
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;
