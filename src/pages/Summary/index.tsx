import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateAISummary from './AISummary/CreateAISummary';

function Summary() {
  return (
    <MainLayout contentKey="createSummary">
      <MainWrapper>
        <ContentWrapper>
          <CreateAISummary />
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Summary;
