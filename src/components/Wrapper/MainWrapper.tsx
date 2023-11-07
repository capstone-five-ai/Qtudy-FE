import styled from 'styled-components';

interface MainWrapperProps {
  children: React.ReactNode;
}

function MainWrapper({ children }: MainWrapperProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  min-width: 535px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 20px;
`;

export default MainWrapper;
