import CopySummaryButton from '@/components/Button/CopySummaryButton';
import PDFDownloadButton from '@/components/Button/PDFDownloadButton';
import SaveToCategoryButton from '@/components/Button/SaveToCategoryButton';
import ShareLinkButton from '@/components/Button/ShareLinkButton';
import SummaryCheckForm from '@/components/Form/SummaryCheckForm';
import SaveToCategoryModal from '@/components/Modal/SaveToCategoryModal';
import DefaultSidebar from '@/components/Sidebar/DefaultSidebar';
import { useGetUserSummaryItem } from '@/hooks/useGetSummary';
import useRedirect from '@/hooks/useRedirect';
import authState from '@/recoils/atoms/authState';
import { GenerateUserSummaryItem } from '@/types/summary.type';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ResultSection() {
  const [searchParams] = useSearchParams();
  const summaryId = Number(searchParams.get('id'));
  const isAuthenticated = useRecoilValue(authState);
  const [showModal, setShowModal] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [summary, setSummary] = useState<GenerateUserSummaryItem>();
  const redirect = useRedirect();
  const {
    data: fetchedSummary,
    error,
    isLoading,
  } = useGetUserSummaryItem(summaryId);

  useEffect(() => {
    if (isNaN(summaryId) || error) {
      redirect('/summary/user');
    }
  }, [summaryId, error, redirect]);

  useEffect(() => {
    if (fetchedSummary) {
      setSummary(fetchedSummary.response);
      setIsWriter(fetchedSummary.isWriter);
    }
  }, [fetchedSummary]);

  if (isLoading) return <div>Loading...</div>;

  if (summary)
    return (
      <>
        <StyledContent>
          <SummaryCheckForm summary={summary} />
        </StyledContent>
        <DefaultSidebar>
          <SidebarContentContainer>
            <StyledButtonContainer>
              <CopySummaryButton text={summary.summaryContent} />
              <ShareLinkButton link={window.location.href} />
              {isAuthenticated && isWriter && (
                <PDFDownloadButton
                  fileId={summary.summaryId}
                  pdfType="SUMMARY"
                  variant={1}
                  type="USER"
                  fileName={summary.summaryTitle}
                />
              )}
            </StyledButtonContainer>
            <SaveToCategoryButton
              generateType="SUMMARY"
              disabled={!isAuthenticated}
              onClick={() => setShowModal(true)}
            />
          </SidebarContentContainer>
        </DefaultSidebar>
        {showModal && (
          <SaveToCategoryModal
            categoryType="SUMMARY"
            contentId={summary.summaryId}
            onClose={() => setShowModal(false)}
          />
        )}
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
