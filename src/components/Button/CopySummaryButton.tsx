import { ReactComponent as CheckIcon } from '@/assets/icons/complete.svg';
import { ReactComponent as CopyIcon } from '@/assets/icons/copy-text.svg';
import useToast from '@/hooks/useToast';
import { styled } from 'styled-components';

type Props = {
  text: string;
};

function CopySummaryButton({ text }: Props) {
  const { fireToast } = useToast();

  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(text);
    fireToast({ icon: <CheckIcon />, message: '텍스트 복사 완료!' });
  };
  return (
    <Wrapper onClick={async () => handleCopyClipBoard()}>
      <CopyIcon />
      <span>요약 복사</span>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;

  span {
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};
  }

  &:hover {
    span {
      ${({ theme }) => theme.typography.caption1};
    }
  }
`;

export default CopySummaryButton;
