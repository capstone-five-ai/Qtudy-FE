import styled from 'styled-components';
//import fileDownload from 'js-file-download';
import { downloadAIQuizFile } from '@/apis/fileApi';
import { ReactComponent as PDFIcon } from '@/assets/icons/download.svg';
import { ServiceType } from '@/types/category.type';

type Props = {
  fileId: number; // 카테고리에서는 카테고리 id값
  pdfType: ServiceType | 'ANSWER';
  variant?: 1 | 2;
  type: 'AI' | 'USER' | 'CATEGORY';
  fileName?: string;
};

const BUTTON_LABEL = {
  QUIZ: '퀴즈',
  ANSWER: '정답',
  SUMMARY: '요약',
};

// TODO: PDF 다운로드 버튼 기능 구현
function PDFDownloadButton({
  variant = 1,
  fileId,
  pdfType,
  type,
  fileName,
}: Props) {
  const handleClickDownload = async () => {
    if (type === 'AI') {
      const convertPdfType = pdfType === 'QUIZ' ? 'PROBLEM' : 'ANSWER';
      const data = await downloadAIQuizFile(fileId, convertPdfType);
      window.location.href = data.fileUrl;
      return;
    }

    /* let pdfBlob;

    if (type === 'USER' && pdfType === 'SUMMARY')
      pdfBlob = await FileApi.downloadUserSummaryFile(fileId);
    if (type === 'CATEGORY' && pdfType === 'PROBLEM')
      pdfBlob = await FileApi.downloadCategoryProblemFile(fileId);
    if (type === 'CATEGORY' && pdfType === 'ANSWER')
      pdfBlob = await FileApi.downloadCategoryAnswerFile(fileId);
    if (type === 'CATEGORY' && pdfType === 'SUMMARY')
      pdfBlob = await FileApi.downloadCategorySummaryFile(fileId); */

    /* fileDownload(pdfBlob, `${fileName}.pdf`); */
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
        <span>{BUTTON_LABEL[pdfType]} PDF</span>
      </StyledButton>
    );
}

const StyledButton = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;

  span {
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};
    width: 53px;
  }

  &:hover {
    span {
      ${({ theme }) => theme.typography.caption1};
    }
  }
`;

const TypographyWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 52px;
  white-space: nowrap;
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
