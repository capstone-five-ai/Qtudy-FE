import styled from 'styled-components';
import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import CategoryItemContentWrapper from '../../../../components/Wrapper/CategoryItemContentWrapper';
import Typography from '../../../../components/Typography';
import LinkButton from '../../../../components/Button/LinkButton';
import { SummaryType } from '../../../../types/summary.type';
import TwinkleButton from '../../../../components/Button/TwinkleButton';
import CategoryModal from '../../../../components/Modal/CategoryModal';

function SummaryItemDetail() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const link = window.location.href;
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const summary: SummaryType = {
    summaryTitle: 'Sum no.1',
    summaryContent: `
    인공지능(AI)은 인간의 인지 능력을 모방할 수 있는 지능적인 기계를 만드는 기술과 연구 분야입니다. 이는 음성 인식, 문제 해결, 학습, 의사 결정 및 패턴 인식과 같이 일반적으로 인간의 지능이 필요한 작업을 수행할 수 있는 컴퓨터 시스템 및 알고리즘을 개발하는 것을 포함합니다. AI는 기계 학습, 자연어 처리, 컴퓨터 비전 및 로봇 공학을 비롯한 다양한 하위 분야를 포함합니다. AI는 의료, 금융, 교통, 제조 및 엔터테인먼트 등 다양한 분야에서 응용되고 있습니다.`,
  };

  const handleMoveToList = () => {
    // TODO: state로 activeCategory도 넘겨주기
    navigate('/management/mycategory', { state: { activeTab: '요약' } });
  };

  const handleEdit = () => {
    navigate(`/management/mycategory/edit?category=summary&id=${params.get('id')}`);
  };

  if (!params.get('id')) return <Navigate to="/management/mycategory" replace />;

  return (
    <>
      <CategoryItemContentWrapper isEdit={false} handleMoveToList={handleMoveToList} handleEdit={handleEdit}>
        <TitleWrapper>
          <Typography variant="subtitle" color="mainMintDark">
            제목
          </Typography>
          <Typography variant="subtitle">{summary.summaryTitle}</Typography>
        </TitleWrapper>
        <Typography variant="body3">{summary.summaryContent}</Typography>
      </CategoryItemContentWrapper>
      <SideWrapper>
        <SideBar>
          <ButtonWrapper>
            <LinkButton link={link} />
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
