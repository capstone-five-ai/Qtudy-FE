import styled, { css } from 'styled-components';
import { ReactComponent as PlusIcon } from '../../assets/icons/icon-plus.svg';
import Typography from '../Typography';

interface AddOptionButtonProps {
  disabled?: boolean;
  handleClick: () => void;
}

function AddOptionButton({ disabled = false, handleClick }: AddOptionButtonProps) {
  return (
    <Container>
      <StyledButton
        $disabled={disabled}
        onClick={() => {
          if (!disabled) handleClick();
        }}
      >
        <PlusIcon />
        <Typography variant="caption2" color={disabled ? 'grayScale06' : 'mainMintDark'}>
          선지 추가하기
        </Typography>
      </StyledButton>
    </Container>
  );
}

AddOptionButton.defaultProps = {
  disabled: false,
};

export default AddOptionButton;

const Container = styled.div`
  padding-left: 28px;
`;

const StyledButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;

  width: 100%;
  padding: 11px 0px;
  background: white;
  border-radius: 8px;

  ${(props) =>
    !props.$disabled
      ? css`
          path {
            fill: ${props.theme.colors.mainMintDark};
          }

          border: dashed 1px ${props.theme.colors.mainMintDark};
          cursor: pointer;
        `
      : css`
          border: dashed 1px ${props.theme.colors.grayScale05};
        `}
`;
