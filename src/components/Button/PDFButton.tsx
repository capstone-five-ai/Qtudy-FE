import styled from 'styled-components';
import { ReactComponent as PDFIcon } from '../../assets/icons/pdf.svg';
import Typography from '../Typography';

type Props = {
  label: string;
};

function PDFButton({ label }: Props) {
  const handleClickDownload = () => {
    // TOOD: download pdf
  };
  return (
    <Wrapper onClick={handleClickDownload}>
      <IconWrapper>
        <PDFIcon />
        <Label>{label}</Label>
      </IconWrapper>
      <Typography variant="caption3" color="grayScale03">
        PDF 다운
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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.mainMintDark};
  font-family: Noto Sans KR;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default PDFButton;
