import styled from 'styled-components';

const Container = styled.div`
  width: 1160px;
  margin: 0 auto;
`;

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return <Container>{children}</Container>;
}

export default Wrapper;
