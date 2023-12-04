import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateAISummary from './AISummary/CreateAISummary';

function Summary() {
  return (
    <MainLayout contentKey="createSummary">
      <ContentWrapper>
        <CreateAISummary />
      </ContentWrapper>
    </MainLayout>
  );
}

export default Summary;
