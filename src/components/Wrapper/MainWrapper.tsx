import styled from 'styled-components';

interface MainWrapperProps {
  children: React.ReactNode;
}

// 내부 inner를 설정해주는 컴포넌트
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
