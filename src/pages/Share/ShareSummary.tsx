import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Typography from '../../components/Typography';
import { SummaryType } from '../../types/summary.type';
import CopySummaryButton from '../Summary/SummaryComplete/CopySummaryButton';
import LinkButton from '../../components/Button/LinkButton';
import TwinkleButton from '../../components/Button/TwinkleButton';
import SummaryCategoryApi from '../../api/SummaryCategoryApi';

function ShareSummary({ currentId }: { currentId: string | null }) {
  const link = window.location.href;
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      const summaryData = data.response;
      setCurrentSummary({
        summaryTitle: summaryData.summaryTitle,
        summaryContent: summaryData.summaryContent,
      });
    });
  };

  useEffect(() => {
    if (currentId) getSummaryItem(currentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainWrapper>
        {currentSummary && (
          <>
            <TitleWrapper>
              <Typography variant="subtitle" color="mainMintDark">
                제목
              </Typography>
              <Typography variant="subtitle">{currentSummary.summaryTitle}</Typography>
            </TitleWrapper>
            <Typography variant="body3">{currentSummary.summaryContent}</Typography>
          </>
        )}
      </MainWrapper>

      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <CopySummaryButton text={currentSummary ? currentSummary.summaryContent : ''} />
            <LinkButton link={link} />
          </ButtonWrapper>

          <TwinkleButton disabled>Save to Category</TwinkleButton>
        </SideBar>
      </SideWrapper>
    </>
  );
}

export default ShareSummary;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;

  gap: 20px;

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
