import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Typography from '../../components/Typography';
import { SummaryType } from '../../types/summary.type';
import CopySummaryButton from '../Summary/SummaryComplete/CopySummaryButton';
import LinkButton from '../../components/Button/LinkButton';
import SummaryCategoryApi from '../../api/SummaryCategoryApi';
import SaveButton from '../../components/Button/SaveButton';

function ShareSummary({ currentId }: { currentId: string | null }) {
  const link = window.location.href;
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      const summaryData = data.response;
      // TODO : 다음 요약 항목 저장하기
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
          <NavWrapper>
            <Nav>
              <div className="nav-title">
                <Typography variant="caption2" color="mainMintDark72">
                  Pre
                </Typography>
              </div>
              <div className="nav-problem-name no-current">
                <Typography variant="caption3" color="grayScale03">
                  이전 요약 제목 들어갈 예정
                </Typography>
              </div>
            </Nav>
            <Nav>
              <div className="nav-problem-name current">
                {currentSummary && (
                  <Typography variant="caption2" color="grayScale02">
                    {currentSummary.summaryTitle}
                  </Typography>
                )}
              </div>
            </Nav>
            <Nav>
              <div className="nav-title">
                <Typography variant="caption2" color="mainMintDark72">
                  Next
                </Typography>
              </div>
              <div className="nav-problem-name no-current">
                <Typography variant="caption3" color="grayScale03">
                  다음 요약 제목 들어갈 예정
                </Typography>
              </div>
            </Nav>
          </NavWrapper>
          <ButtonWrapper>
            <ButtonList>
              <CopySummaryButton text={currentSummary ? currentSummary.summaryContent : ''} />
              <LinkButton link={link} />
            </ButtonList>
            <SaveButton disabled />
          </ButtonWrapper>
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
  width: 360px;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};
  margin: 24px 0;
  padding-right: 36px;
  flex: 1;
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0px;
`;

const Nav = styled.div`
  .nav-title {
    margin-left: 28px;
  }

  .nav-problem-name {
    padding: 6px 0px;

    border-left: 2px solid;
    border-color: transparent;
  }

  .current {
    padding-left: 26px;
    border-color: ${(props) => props.theme.colors.mainMint};

    display: flex;
    justify-content: space-between;

    & > div {
      width: 248px;
      word-break: break-all;
    }

    .icon {
      cursor: pointer;
    }
  }

  .no-current {
    margin-left: 26px;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: end;
  margin-left: 36px;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
