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
        background: ${({ theme }) => theme.colors.mainMintGra};
        box-shadow: ${({ theme }) =>
          `4px 2px 16px 0px ${theme.colors.mainMintShadow}`};

        &:hover {
          background: ${({ theme }) => theme.colors.mainMintDarkGra};
        }
      `;

    case 'gray':
      return css`
        color: ${({ theme }) => theme.colors.grayScale03};
        background: ${({ theme }) => theme.colors.grayScale08};
        box-shadow: 4px 2px 16px 0px rgba(189, 189, 189, 0.28);
        border: 0.8px solid ${({ theme }) => theme.colors.grayScale06};

        &:hover {
          color: ${({ theme }) => theme.colors.grayScale02};
          box-shadow: 4px 2px 16px 0px rgba(142, 142, 142, 0.24);
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
  ${({ theme }) => theme.typography.button};
  ${({ $size }) => getSizeStyle($size)}
  ${({ $variant }) => getVariantStyle($variant)}

  &:disabled {
    background: ${({ theme }) => theme.colors.grayScale06};
    color: ${({ theme }) => theme.colors.grayScale09};
    box-shadow: none;
    cursor: default;
  }
`;
