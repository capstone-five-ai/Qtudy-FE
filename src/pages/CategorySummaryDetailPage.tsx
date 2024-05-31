import Scrollbar from '@/components/Scrollbar/Scrollbar';
import ContentWrapper from '@/components/Wrapper/ContentWrapper';
import CategorySidebar from '@/containers/CategoryDetailPage/CategorySidebar';
import TopButtonBar from '@/containers/CategoryDetailPage/TopButtonBar';
import authState from '@/recoils/atoms/authState';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function CategorySummaryDetailPage() {
  const isAuthenticated = useRecoilValue(authState);

  return (
    <ContentWrapper>
      <StyledContent $isAuthenticated={isAuthenticated}>
        {isAuthenticated && <TopButtonBar />}
        <StyledInnerContainer>
          {/* <SummaryCheckForm summary={summary} /> */}
        </StyledInnerContainer>
      </StyledContent>
      <CategorySidebar isAuthenticated={isAuthenticated} />
    </ContentWrapper>
  );
}

export default CategorySummaryDetailPage;

const StyledContent = styled.div<{ $isAuthenticated: boolean }>`
  flex: 1;
  padding: 0 20px 40px 40px;
  padding-top: ${({ $isAuthenticated }) =>
    $isAuthenticated ? '24px' : '40px'};
`;

const StyledInnerContainer = styled.div`
  overflow-y: scroll;
  ${Scrollbar}
`;
