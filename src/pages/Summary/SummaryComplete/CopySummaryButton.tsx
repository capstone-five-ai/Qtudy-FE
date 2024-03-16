import { styled } from 'styled-components';
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy_text.svg';
import Typography from '../../../components/Typography';
import useToast from '../../../hooks/useToast';

type Props = {
  text: string;
};

function CopySummaryButton({ text }: Props) {
  const { fireToast } = useToast();

  const handleCopyClipBoard = async () => {
    await navigator.clipboard.writeText(text);
    fireToast('텍스트 복사 완료!');
  };

  return (
    <Wrapper onClick={async () => handleCopyClipBoard()}>
      <CopyIcon />
      <Typography variant="caption3" color="grayScale03" hoverVariant="caption1">
        요약 복사
      </Typography>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

export default CopySummaryButton;
