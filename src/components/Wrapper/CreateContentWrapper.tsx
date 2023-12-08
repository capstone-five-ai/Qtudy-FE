import { ReactNode } from 'react';
import styled from 'styled-components';

interface CreateContentWrapperProps {
  children: ReactNode;
}
function CreateContentWrapper({ children }: CreateContentWrapperProps) {
  return <Container>{children}</Container>;
}

export default CreateContentWrapper;

const Container = styled.div`
  flex-grow: 1;
  padding: 24px 0px;
  padding-left: 36px;
  padding-right: 20px;
`;
