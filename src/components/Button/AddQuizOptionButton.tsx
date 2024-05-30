import { ReactComponent as PlusIcon } from '@/assets/icons/plus.svg';
import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

interface AddOptionButtonProps {
  disabled?: boolean;
  handleClick: () => void;
}

function AddQuizOptionButton({
  disabled = false,
  handleClick,
}: AddOptionButtonProps) {
  return (
    <StyledContainer>
      <StyledButton
        disabled={disabled}
        onClick={() => {
          if (!disabled) handleClick();
        }}
      >
        <PlusIcon />
        <Typography
          variant="caption2"
          color={disabled ? 'grayScale06' : 'mainMintDark'}
        >
          항목 추가하기
        </Typography>
      </StyledButton>
    </StyledContainer>
  );
}

export default AddQuizOptionButton;

const StyledContainer = styled.div`
  padding-left: 28px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;

  width: 100%;
  padding: 11px 0px;
  background: white;
  border-radius: 8px;

  border: dashed 1px ${({ theme }) => theme.colors.mainMintDark};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.mainMintLight};
  }

  &:disabled {
    path {
      fill: ${({ theme }) => theme.colors.grayScale06};
    }

    border: dashed 1px ${({ theme }) => theme.colors.grayScale05};
  }
`;
