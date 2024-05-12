import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SummaryCategoryApi from '../../../../api/SummaryCategoryApi';
import LinkButton from '../../../../components/Button/LinkButton';
import PDFButton from '../../../../components/Button/PDFButton';
import SaveButton from '../../../../components/Button/SaveButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Typography from '../../../../components/Typography';
import { CategoryOtherSummary, SummaryType } from '../../../../types/summary.type';
import CopySummaryButton from '../../../Summary/SummaryComplete/CopySummaryButton';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import CategoryItemButtonBar from '../../../../components/ButtonBar/CategoryItemButtonBar';
import Scrollbar from '../../../../components/Scrollbar';
import DeleteModal from '../../../../components/Modal/DeleteModal';

function SummaryItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [currentCategoryId, setCurrentCategoryId] = useState(-1);
  const [currentSummaryId, setCurrentSummaryId] = useState(-1);
  const [prevSummary, setPrevSummary] = useState<CategoryOtherSummary | null>(null);
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);
  const [nextSummary, setNextSummary] = useState<CategoryOtherSummary | null>(null);
  const mainUrl = window.location.origin;

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      const summaryData = data.response;
      setCurrentSummary({
        summaryTitle: summaryData.summaryTitle,
        summaryContent: summaryData.summaryContent,
      });
      setCurrentCategoryId(summaryData.categoryId);
      setCurrentSummaryId(summaryData.categorizedSummaryId);
      setPrevSummary(summaryData.previousSummary);
      setNextSummary(summaryData.nextSummary);
    });
  };

  useEffect(() => {
    const id = params.get('id');
    if (id) getSummaryItem(id);
  }, [params]);

  const handleReturnToList = () => {
    navigate(`/management/mycategory?type=summary&categoryId=${currentCategoryId}`);
  };

  const handleEdit = () => {
    navigate(`/management/mycategory/edit?category=summary&id=${params.get('id')}`, {
      state: { summaryData: currentSummary },
    });
  };

  const handleDeleteItem = () => {
    SummaryCategoryApi.delete(Number(params.get('id'))).then(() => {
      handleReturnToList();
    });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <StyledContainer>
        <CategoryItemButtonBar handleReturnToList={handleReturnToList} handleEdit={handleEdit} />
        {currentSummary && (
          <>
            <TitleWrapper>
              <Typography variant="subtitle" color="mainMintDark">
                제목
              </Typography>
              <Typography variant="subtitle">{currentSummary.summaryTitle}</Typography>
            </TitleWrapper>
            <div className="summary-content">{currentSummary.summaryContent}</div>
          </>
        )}
      </StyledContainer>
      <Sidebar>
        <div className="content">
          {prevSummary && (
            <Navigation>
              <span className="label">Pre</span>
              <button
                type="button"
                onClick={() =>
                  navigate(`/management/mycategory/detail?category=summary&id=${prevSummary.categorizedSummaryId}`)
                }
              >
                {prevSummary.categorizedSummaryName}
              </button>
            </Navigation>
          )}
          {currentSummary && (
            <CurrentNavigation>
              <button type="button">{currentSummary.summaryTitle}</button>
              <DeleteIcon className="delete-button" onClick={() => setShowDeleteModal(true)} />
            </CurrentNavigation>
          )}
          {nextSummary && (
            <Navigation>
              <span className="label">Next</span>
              <button
                type="button"
                onClick={() =>
                  navigate(`/management/mycategory/detail?category=summary&id=${nextSummary.categorizedSummaryId}`)
                }
              >
                {nextSummary.categorizedSummaryName}
              </button>
            </Navigation>
          )}
        </div>
        {currentSummary && (
          <ButtonWrapper>
            <CopySummaryButton text={currentSummary.summaryContent} />
            <LinkButton link={`${mainUrl}/management/mycategory/share?category=summary&id=${params.get('id')}`} />
            <PDFButton
              label="요약"
              type="category"
              fileId={currentSummaryId || -1}
              pdfType="SUMMARY"
              fileName={currentSummary.summaryTitle}
            />
          </ButtonWrapper>
        )}
        <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
      </Sidebar>
      {showCategoryModal && currentSummary && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          categoryType="summary"
          contentId={Number(params.get('id') || -1)}
          generateType={currentSummary.aiGeneratedSummaryId ? 'ai' : 'user'}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            handleDeleteItem();
          }}
          title="요약을 삭제하시겠습니까?"
        />
      )}
    </>
  );
}

export default SummaryItemDetail;

const StyledContainer = styled.div`
  flex-grow: 1;
  padding: 24px 20px 20px 40px;

  display: flex;
  flex-direction: column;

  .summary-content {
    ${({ theme }) => theme.typography.body3};
    color: ${({ theme }) => theme.colors.grayScale02};
    word-break: break-all;
    white-space: pre-wrap;
    overflow-y: scroll;
    ${Scrollbar}
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 360px;
  margin: 24px 0;
  border-left: 1px solid ${(props) => props.theme.colors.grayScale06};

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 36px;

  .content {
    position: absolute;
    top: 0;
    left: -1px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
    margin-top: 16px;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding-left: 24px;
  padding-right: 36px;
  border-left: 2px solid transparent;

  min-height: 38px;

  .label {
    ${({ theme }) => theme.typography.caption2};
    color: rgba(54, 189, 180, 0.72);
  }

  button {
    width: 248px;

    cursor: pointer;
    text-align: left;
    ${({ theme }) => theme.typography.caption3};
    color: ${({ theme }) => theme.colors.grayScale03};

    word-break: break-all;
  }
`;

const CurrentNavigation = styled(Navigation)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-left-color: ${(props) => props.theme.colors.mainMint};

  button {
    width: 248px;
    cursor: pointer;
    text-align: left;
    ${({ theme }) => theme.typography.caption2};
    color: ${({ theme }) => theme.colors.grayScale02};
  }

  .delete-button {
    cursor: pointer;
  }
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
