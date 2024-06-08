import Typography from '@/components/Typography/Typography';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
  selected: boolean;
};

function FileTypeChip({
  children,
  selected,
  ...props
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  return (
    <Wrapper type="button" {...props} $selected={selected}>
      <Typography
        variant="button"
        color={selected ? 'grayScale09' : 'mainMintDark'}
      >
        {children}
      </Typography>
    </Wrapper>
  );
}

export default FileTypeChip;

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
`;
