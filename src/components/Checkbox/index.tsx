import styled from 'styled-components';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';

type Props = {
  checked: boolean;
};

function CheckBox({ checked, ...props }: Props) {
  return (
    <Wrapper {...props} $checked={checked}>
      {checked && <CheckIcon />}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;

  border: 1px solid ${({ $checked }) => ($checked ? '#3ED7CD' : '#BDBDBD')};
  background: ${({ $checked }) => ($checked ? '#3ED7CD' : '#fff')};
`;

export default CheckBox;
