import styled from 'styled-components';
//import fileDownload from 'js-file-download';
//import FileApi from '../../api/FileApi';
import { ReactComponent as PDFIcon } from '@/assets/icons/download.svg';
import Typography from '@/components/Typography';
//import Typography from '../Typography';

type Props = {
  //fileId: number; // 카테고리에서는 카테고리 id값
  pdfType: 'QUIZ' | 'ANSWER' | 'SUMMARY';
  variant?: 1 | 2;
  //type: 'ai' | 'user' | 'category';
  //fileName: string;
};

const BUTTON_LABEL = {
  QUIZ: '퀴즈',
  ANSWER: '정답',
  SUMMARY: '요약',
};

// TODO: PDF 다운로드 버튼 기능 구현
function PDFDownloadButton({
  variant = 1,
  //fileId,
  pdfType,
  //type,
  //fileName,
}: Props) {
  const handleClickDownload = async () => {
    /* if (type === 'ai') {
      const data = await FileApi.downloadAIFile(fileId, pdfType);
      window.location.href = data.fileUrl;
      return;
    } */
    /* let pdfBlob;

    if (type === 'user' && pdfType === 'SUMMARY')
      pdfBlob = await FileApi.downloadUserSummaryFile(fileId);
    if (type === 'category' && pdfType === 'PROBLEM')
      pdfBlob = await FileApi.downloadCategoryProblemFile(fileId);
    if (type === 'category' && pdfType === 'ANSWER')
      pdfBlob = await FileApi.downloadCategoryAnswerFile(fileId);
    if (type === 'category' && pdfType === 'SUMMARY')
      pdfBlob = await FileApi.downloadCategorySummaryFile(fileId);

    fileDownload(pdfBlob, `${fileName}.pdf`); */
  };

  if (variant === 1)
    return (
      <StyledButton onClick={handleClickDownload}>
        <IconWrapper>
          <PDFIcon />
          <Label>{BUTTON_LABEL[pdfType]}</Label>
        </IconWrapper>
        <TypographyWrapper>
          <span>PDF 다운</span>
        </TypographyWrapper>
      </StyledButton>
    );

  if (variant === 2)
    return (
      <StyledButton onClick={handleClickDownload}>
        <PDFIcon />
        <Typography
          variant="caption3"
          color="grayScale03"
          hoverVariant="caption1"
        >
          {BUTTON_LABEL[pdfType]} PDF
        </Typography>
      </StyledButton>
    );
}

const StyledButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TypographyWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 52px;
  white-space: nowrap;

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

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.mainMintDark};
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export default PDFDownloadButton;
