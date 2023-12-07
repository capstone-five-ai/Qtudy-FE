import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import MainWrapper from '../../components/Wrapper/MainWrapper';
import MainLayout from '../../layouts/MainLayout';
import CreateUserSummary from './UserSummary/CreateUserSummary';

function Summary() {
  return (
    <MainLayout contentKey="createSummary">
      <MainWrapper>
        <ContentWrapper>
          <CreateUserSummary />
        </ContentWrapper>
      </MainWrapper>
    </MainLayout>
  );
}

export default Summary;
