import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateUserSummary from './UserSummary/CreateUserSummary';

function Summary() {
  return (
    <MainLayout contentKey="createSummary">
      <ContentWrapper>
        <CreateUserSummary />
      </ContentWrapper>
    </MainLayout>
  );
}

export default Summary;
