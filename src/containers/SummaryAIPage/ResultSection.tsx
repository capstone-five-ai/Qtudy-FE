import CopySummaryButton from '@/components/Button/CopySummaryButton';
import PDFDownloadButton from '@/components/Button/PDFDownloadButton';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import Scrollbar from '@/components/Scrollbar/Scrollbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Typography from '@/components/Typography/Typography';
import authState from '@/recoils/atoms/authState';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ResultSection() {
  const isAuthenticated = useRecoilValue(authState);
  const [showModal, setShowModal] = useState(false);
  const [summaryType, setSummaryType] = useState<'AI' | 'USER' | null>(null);
  const [summary, setSummary] = useState({
    summaryTitle: '요약 제목',
    summaryContent: '요약 내용',
  });
  const [qs] = useSearchParams();
  const summaryId = Number(qs.get('id'));

  const getSummary = useCallback(
    async (id: number) => {
      console.log(id);
      // TODO: 요약 조회 API 연동
      /* let data;
      if (type === 'ai')
        data = await SummaryApi.getAISummary(id, isAuthenticated);
      if (type === 'user')
        data = await SummaryApi.getUserSummary(id, isAuthenticated);

      if (data.isWriter) setIsWriter(true);
      setSummary(data.response); */
    },
    [summaryType]
  );

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('ai')) setSummaryType('AI');
    if (currentPath.includes('user')) setSummaryType('USER');
  }, []);

  useEffect(() => {
    getSummary(summaryId);
  }, [getSummary, summaryId]);

  if (!summary) return null;

  return (
    <>
      <StyledContent>
        <StyledTitleWrapper>
          <Typography variant="subtitle" color="mainMintDark">
            제목
          </Typography>
          <Typography variant="subtitle" color="grayScale02">
            {summary.summaryTitle}
          </Typography>
        </StyledTitleWrapper>
        <StyledContentWrapper>
          <div className="content">{summary.summaryContent}</div>
        </StyledContentWrapper>
      </StyledContent>
      <Sidebar>
        <SidebarContentContainer>
          <StyledButtonContainer>
            <CopySummaryButton text={summary.summaryContent} />
            <ShareLinkButton link={window.location.href} />
            {isAuthenticated && (
              <PDFDownloadButton variant={1} pdfType="SUMMARY" />
            )}
          </StyledButtonContainer>
          <SaveToCategoryButton
            disabled={!isAuthenticated}
            onClick={() => setShowModal(true)}
          />
        </SidebarContentContainer>
      </Sidebar>
      {showModal && <SaveToCategoryModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default ResultSection;

const StyledContent = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  padding: 40px;
  padding-right: 20px;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const StyledContentWrapper = styled.div`
  overflow-y: scroll;
  ${Scrollbar};

  .content {
    ${({ theme }) => theme.typography.body3};
    color: ${({ theme }) => theme.colors.grayScale02};
    white-space: pre-wrap;
  }
`;

const SidebarContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 30px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
