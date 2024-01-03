import styled from 'styled-components';
import Typography from '../../../../../components/Typography';

type Props = {
  selected: boolean;
  num: number;
};

function NumberItem({ selected, num }: Props) {
  const variant = selected ? 'caption1' : 'caption3';
  const color = selected ? 'mainMint' : 'grayScale02';
  const padNum = num.toString().padStart(2, '0');

  return (
    <Wrapper $selected={selected}>
      <Typography variant={variant} color={color}>
        {padNum}
      </Typography>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export default NumberItem;
