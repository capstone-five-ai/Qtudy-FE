import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

type Props = {
  children: ReactNode;
  selected: boolean;
};

function Chip({
  children,
  selected,
  ...props
}: Props & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <Wrapper type="button" {...props} $selected={selected}>
      <Typography variant="detail" color={selected ? 'grayScale09' : 'mainMintDark'}>
        {children}
      </Typography>
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $selected: boolean }>`
  display: flex;
  width: 68px;
  height: 27px;
  padding: 5px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #36bdb4;
  background: ${({ $selected }) => ($selected ? '#3ed7cd' : '#fff')};

  box-shadow: none;

  cursor: pointer;
`;

export default Chip;
