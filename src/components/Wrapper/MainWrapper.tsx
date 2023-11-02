import styled from 'styled-components';

const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
`;

interface MainWrapperProps {
  children: React.ReactNode;
}

function MainWrapper({ children }: MainWrapperProps) {
  return <Container>{children}</Container>;
}

export default MainWrapper;
