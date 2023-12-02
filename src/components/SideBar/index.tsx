import styled from 'styled-components';
import { ReactNode } from 'react';
import GenerateButton from '../Button/GenerateButton';

interface SideBarProps {
  buttonDisabled: boolean;
  handleSubmit: () => void;
  children: ReactNode;
}

function SideBar({ buttonDisabled, handleSubmit, children }: SideBarProps) {
  return (
    <Container>
      <InnerContainer>
        <div>{children}</div>
        <GenerateButton disabled={buttonDisabled} onClick={handleSubmit} />
      </InnerContainer>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  width: 360px;
  padding: 24px 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  padding: 0px 36px;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;