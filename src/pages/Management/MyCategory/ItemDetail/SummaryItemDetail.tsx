import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LinkButton from '../../../../components/Button/LinkButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';
import Typography from '../../../../components/Typography';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import { CateogorizedOtherSummary, SummaryType } from '../../../../types/summary.type';
import CopySummaryButton from '../../../Summary/SummaryComplete/CopySummaryButton';
import PDFButton from '../../../../components/Button/PDFButton';
import SummaryCategoryApi from '../../../../api/SummaryCategoryApi';
import SaveButton from '../../../../components/Button/SaveButton';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import DeleteModal from '../../../../components/Modal/DeleteModal';

function SummaryItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCategoaryId, setCurrentCategoaryId] = useState(-1);
  const [currentSummaryId, setCurrentSummaryId] = useState(-1);
  const [currentSummary, setCurrentSummary] = useState<SummaryType | null>(null);
  const [otherSummaryList, setOtherSummaryList] = useState<{
    pre: CateogorizedOtherSummary | null;
    next: CateogorizedOtherSummary | null;
  }>({ pre: null, next: null });
  const mainUrl = window.location.origin;

  const getSummaryItem = async (id: string) => {
    await SummaryCategoryApi.get(id).then((data) => {
      const summaryData = data.response;
      // TODO : 다음 요약 항목 저장하기
      // setOtherSummaryList({ pre: summaryData.categorizedSummary[0], next: summaryData.categorizedSummary[1] });
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

  const handleDelete = () => {
    SummaryCategoryApi.delete(Number(params.get('id'))).then(() => {
      navigate(-1);
    });
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  if (currentSummary)
    return (
      <>
        {showDeleteModal && (
          <DeleteModal
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            onConfirm={() => {
              handleDelete();
            }}
            title="요약을 삭제하시겠습니까?"
          />
        )}
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
            <NavWrapper>
              {otherSummaryList.pre && (
                <Nav>
                  <div className="nav-title">
                    <Typography variant="caption2" color="mainMintDark72">
                      Pre
                    </Typography>
                  </div>
                  <button
                    type="button"
                    className="nav-problem-name no-current"
                    onClick={() => {
                      navigate(
                        `/management/mycategory/detail?category=summary&id=${otherSummaryList.pre?.categorizedSummaryId}`
                      );
                    }}
                  >
                    <Typography variant="caption3" color="grayScale03">
                      이전 요약 제목 들어갈 예정
                    </Typography>
                  </button>
                </Nav>
              )}
              {(otherSummaryList.pre || otherSummaryList.next) && (
                <Nav>
                  <div className="nav-problem-name current">
                    {currentSummary && (
                      <Typography variant="caption2" color="grayScale02">
                        {currentSummary.summaryTitle}
                      </Typography>
                    )}
                    <DeleteIcon
                      className="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(true);
                      }}
                    />
                  </div>
                </Nav>
              )}
              {otherSummaryList.next && (
                <Nav>
                  <div className="nav-title">
                    <Typography variant="caption2" color="mainMintDark72">
                      Next
                    </Typography>
                  </div>
                  <button
                    type="button"
                    className="nav-problem-name no-current"
                    onClick={() => {
                      navigate(
                        `/management/mycategory/detail?category=summary&id=${otherSummaryList.next?.categorizedSummaryId}`
                      );
                    }}
                  >
                    <Typography variant="caption3" color="grayScale03">
                      다음 요약 제목 들어갈 예정
                    </Typography>
                  </button>
                </Nav>
              )}
            </NavWrapper>
            <ButtonWrapper>
              <ButtonList>
                <CopySummaryButton text={currentSummary.summaryContent} />
                <LinkButton link={`${mainUrl}/management/mycategory/share?category=summary&id=${params.get('id')}`} />
                <PDFButton
                  label="요약"
                  type="category"
                  fileId={currentSummaryId || -1}
                  pdfType="SUMMARY"
                  fileName={currentSummary.summaryTitle}
                />
              </ButtonList>
              <SaveButton disabled={false} onClick={() => setShowCategoryModal(true)} />
            </ButtonWrapper>
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
    align-items: center;

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
