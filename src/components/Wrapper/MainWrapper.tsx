import styled from 'styled-components';

interface MainWrapperProps {
  children: React.ReactNode;
}

function MainWrapper({ children }: MainWrapperProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
`;

export default MainWrapper;
