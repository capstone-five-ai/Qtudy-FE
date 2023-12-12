import styled from 'styled-components';
import fileDownload from 'js-file-download';
import FileApi from '../../api/FileApi';
import { ReactComponent as PDFIcon } from '../../assets/icons/pdf.svg';
import Typography from '../Typography';

type Props = {
  label: string;
  fileId: number; // 카테고리에서는 카테고리 id값
  pdfType: 'PROBLEM' | 'ANSWER' | 'SUMMARY';
  variant?: 1 | 2;
  type: 'ai' | 'user' | 'category';
  fileName: string;
};

PDFButton.defaultProps = {
  variant: 1,
};

function PDFButton({ label, variant, fileId, pdfType, type, fileName }: Props) {
  const handleClickDownload = async () => {
    if (type === 'ai') {
      const data = await FileApi.downloadAIFile(fileId, pdfType);
      window.location.href = data.fileUrl;
      return;
    }

    let pdfBlob;

    if (type === 'user' && pdfType === 'SUMMARY') pdfBlob = await FileApi.downloadUserSummaryFile(fileId);
    if (type === 'category' && pdfType === 'PROBLEM') pdfBlob = await FileApi.downloadCategoryProblemFile(fileId);
    if (type === 'category' && pdfType === 'ANSWER') pdfBlob = await FileApi.downloadCategoryAnswerFile(fileId);
    if (type === 'category' && pdfType === 'SUMMARY') pdfBlob = await FileApi.downloadCategorySummaryFile(fileId);

    fileDownload(pdfBlob, `${fileName}.pdf`);
  };

  if (variant === 1)
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

  if (variant === 2)
    return (
      <Wrapper onClick={handleClickDownload}>
        <PDFIcon />
        <Typography variant="caption3" color="grayScale03">
          {label} PDF
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
