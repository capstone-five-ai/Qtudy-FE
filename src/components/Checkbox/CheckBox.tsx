import { ReactComponent as CheckIcon } from '@/assets/icons/check.svg';
import styled from 'styled-components';

type Props = {
  checked: boolean;
};

function CheckBox({ checked, ...props }: Props) {
  return (
    <Wrapper {...props} $checked={checked}>
      {checked && <CheckIcon width="16px" height="16px" />}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;

  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.mainMint : theme.colors.grayScale05};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.mainMint : theme.colors.grayScale09};
`;

export default CheckBox;
