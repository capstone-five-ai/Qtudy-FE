import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import Typography from '../../../../components/Typography';
import LinkButton from '../../../../components/Button/LinkButton';
import { SummaryType } from '../../../../types/summary.type';
import TwinkleButton from '../../../../components/Button/TwinkleButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import CopySummaryButton from '../../../Summary/SummaryComplete/CopySummaryButton';
import PDFButton from '../../../../components/Button/PDFButton';
import SummaryCategoryApi from '../../../../api/SummaryCategoryApi';

function SummaryItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      setCurrentSummary({
        summaryTitle: data.summaryTitle,
        summaryContent: data.summaryContent,
      });
      setCurrentCategoaryId(data.categoryId);
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
    navigate(`/management/mycategory/edit?category=summary&id=${params.get('id')}`);
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
              <CopySummaryButton text={currentSummary.summaryContent} />
              <LinkButton link={link} />
              <PDFButton label="요약" />
            </ButtonWrapper>

            <TwinkleButton disabled={false} onClick={() => setShowCategoryModal(true)}>
              Save to Category
            </TwinkleButton>
          </SideBar>
        </SideWrapper>
        {showCategoryModal && <CategoryModal onClose={() => setShowCategoryModal(false)} categoryType="PROBLEM" />}
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
  gap: 16px;
  justify-content: end;
  align-items: end;

  height: 100%;
`;
