import styled, { css } from 'styled-components';

type PlainButtonVariant = 'primary' | 'gray';
type PlainButtonSize = 'small' | 'medium' | 'large';

interface PlainButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: PlainButtonVariant;
  size?: PlainButtonSize;
}

function PlainButton({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: PlainButtonProps) {
  return (
    <StyledButton {...props} $variant={variant} $size={size}>
      {children}
    </StyledButton>
  );
}

export default PlainButton;

const getSizeStyle = ($size: PlainButtonSize) => {
  switch ($size) {
    case 'small':
      return css`
        width: 100px;
        height: 40px;
      `;

    case 'medium':
      return css`
        width: 288px;
        height: 48px;
      `;

    case 'large':
      return css`
        width: 360px;
        height: 48px;
      `;
  }
};

const getVariantStyle = ($variant: PlainButtonVariant) => {
  switch ($variant) {
    case 'primary':
      return css`
        color: ${({ theme }) => theme.colors.grayScale09};
        background: ${({ theme }) => theme.colors.mainMint};

        &:hover {
          background: ${({ theme }) => theme.colors.mainMintMedium};
          box-shadow: 0px 4px 12px 0px
            ${({ theme }) => theme.colors.mainMintShadow};
        }
      `;

    case 'gray':
      return css`
        color: ${({ theme }) => theme.colors.grayScale03};
        background: ${({ theme }) => theme.colors.grayScale08};
        border: 0.8px solid ${({ theme }) => theme.colors.grayScale06};

        &:hover {
          color: ${({ theme }) => theme.colors.grayScale02};
          box-shadow: 0px 2px 8px 0px rgba(142, 142, 142, 0.12);
        }
      `;
  }
};

const StyledButton = styled.button<{
  $variant: PlainButtonVariant;
  $size: PlainButtonSize;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  ${({ theme }) => theme.typography.button}
  ${({ $size }) => getSizeStyle($size)}
  ${({ $variant }) => getVariantStyle($variant)}

  transition: all 0.3s ease;

  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale06};
    color: ${({ theme }) => theme.colors.grayScale09};
    box-shadow: none;
    cursor: default;
  }
`;
