import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SummaryCategoryApi from '../../../../api/SummaryCategoryApi';
import LinkButton from '../../../../components/Button/LinkButton';
import PDFButton from '../../../../components/Button/PDFButton';
import SaveButton from '../../../../components/Button/SaveButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Typography from '../../../../components/Typography';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import { SummaryType } from '../../../../types/summary.type';
import CopySummaryButton from '../../../Summary/SummaryComplete/CopySummaryButton';

function SummaryItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentSummaryId, setCurrentSummaryId] = useState(-1);
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);
  const mainUrl = window.location.origin;

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      const summaryData = data.response;
      setCurrentSummary({
        summaryTitle: summaryData.summaryTitle,
        summaryContent: summaryData.summaryContent,
      });
      setCurrentCategoaryId(summaryData.categoryId);
      setCurrentSummaryId(summaryData.categorizedSummaryId);
    });
  };

  useEffect(() => {
    const id = params.get('id');
    if (id) getSummaryItem(id);
  }, [params]);

  const handleMoveToList = () => {
    navigate('/management/mycategory', { state: { activeTab: '요약', categoryId: currentCategoaryId } });
  };

  const handleEdit = () => {
    navigate(`/management/mycategory/edit?category=summary&id=${params.get('id')}`, {
      state: { summaryData: currentSummary },
    });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  if (currentSummary)
    return (
      <>
        <CategoryItemContentWrapper handleMoveToList={handleMoveToList} handleEdit={handleEdit}>
          <TitleWrapper>
            <Typography variant="subtitle" color="mainMintDark">
              제목
            </Typography>
            <Typography variant="subtitle">{currentSummary.summaryTitle}</Typography>
          </TitleWrapper>
          <Typography variant="body3">{currentSummary.summaryContent}</Typography>
        </CategoryItemContentWrapper>
        <SideWrapper>
          <SideBar>
            <ButtonWrapper>
              <div>
                <CopySummaryButton text={currentSummary.summaryContent} />
                <LinkButton link={`${mainUrl}/management/mycategory/share?category=summary&id=${params.get('id')}`} />
                <PDFButton
                  label="요약"
                  type="category"
                  fileId={currentSummaryId || -1}
                  pdfType="SUMMARY"
                  fileName={currentSummary.summaryTitle}
                />
              </div>
            </ButtonWrapper>

            <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
          </SideBar>
        </SideWrapper>
        {showCategoryModal && (
          <CategoryModal
            onClose={() => setShowCategoryModal(false)}
            categoryType="PROBLEM"
            contentId={Number(params.get('id') || -1)}
            generateType={currentSummary.aiGeneratedSummaryId ? 'ai' : 'user'}
          />
        )}
      </>
    );
}

export default SummaryItemDetail;

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
  justify-content: end;
  align-items: end;

  height: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: start;
  }
`;
