import styled from 'styled-components';
import { ReactNode } from 'react';
import LargeButton from '../Button/LargeButton';

interface SideBarProps {
  buttonDisabled: boolean;
  handleSubmit: () => void;
  children: ReactNode;
}

function SideBar({ buttonDisabled, handleSubmit, children }: SideBarProps) {
  return (
    <Container>
      <InnerContainer>
        {children}
        <LargeButton type="button" disabled={buttonDisabled} onClick={handleSubmit}>
          Generate
        </LargeButton>
      </InnerContainer>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  width: 360px;
  padding: 24px 0px;
  margin-left: auto;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

  height: 100%;
  padding: 0px 36px;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;
