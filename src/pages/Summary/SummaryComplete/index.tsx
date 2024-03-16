import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import SummaryApi from '../../../api/SummaryApi';
import LinkButton from '../../../components/Button/LinkButton';
import PDFButton from '../../../components/Button/PDFButton';
import CategoryModal from '../../../components/Modal/CategoryModal';
import Typography from '../../../components/Typography';
import { SummaryType } from '../../../types/summary.type';
import CopySummaryButton from './CopySummaryButton';
import authState from '../../../recoil/atoms/authState';
import Scrollbar from '../../../components/Scrollbar';
import SaveButton from '../../../components/Button/SaveButton';

type Props = {
  type: 'ai' | 'user';
};

function SummaryComplete({ type }: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;
  const [summary, setSummary] = useState<SummaryType>();
  const isAuthenticated = useRecoilValue(authState);
  const [isWriter, setIsWriter] = useState(false);

  const [qs] = useSearchParams();
  const summaryId = Number(qs.get('id'));

  const getSummary = useCallback(
    async (id: number) => {
      let data;
      if (type === 'ai') data = await SummaryApi.getAISummary(id, isAuthenticated);
      if (type === 'user') data = await SummaryApi.getUserSummary(id, isAuthenticated);

      if (data.isWriter) setIsWriter(true);
      setSummary(data.response);
    },
    [type, isAuthenticated]
  );

  useEffect(() => {
    getSummary(summaryId);
  }, [getSummary, summaryId]);

  if (!summary) return <div />;

  return (
    <>
      <MainWrapper>
        <TitleWrapper>
          <Typography variant="subtitle" color="mainMintDark">
            제목
          </Typography>
          <Typography variant="subtitle">{summary.summaryTitle}</Typography>
        </TitleWrapper>
        <Typography variant="body3">{summary.summaryContent}</Typography>
      </MainWrapper>

      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <CopySummaryButton text={summary.summaryContent} />
            <LinkButton link={link} />
            <PDFButton label="요약" fileId={summaryId} type={type} pdfType="SUMMARY" fileName={summary.summaryTitle} />
          </ButtonWrapper>

          <SaveButton disabled={!isWriter} onClick={() => setShowCategoryModal(true)} />
        </SideBar>
      </SideWrapper>
      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="SUMMARY"
          contentId={summary.memberSavedSummaryId || summary.aiGeneratedSummaryId || -1}
          generateType={type}
        />
      )}
    </>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;

  gap: 20px;

  overflow-y: scroll;
  ${Scrollbar}

  & > div:nth-child(2) {
    white-space: pre-wrap;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  margin: 24px 0;
  padding: 0 36px;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  gap: 16px;
  justify-content: end;
  align-items: end;

  height: 100%;
`;

export default SummaryComplete;
