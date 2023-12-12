import styled from 'styled-components';
import { ReactNode } from 'react';
import TwinkleButton from '../Button/TwinkleButton';

interface SideBarProps {
  buttonDisabled: boolean;
  handleSubmit: () => void;
  children: ReactNode;
}

function SideBar({ buttonDisabled, handleSubmit, children }: SideBarProps) {
  return (
    <Container>
      <InnerContainer>
        <ChildrenContainer>
          <div>{children}</div>
          <TwinkleButton disabled={buttonDisabled} onClick={handleSubmit}>
            Generate
          </TwinkleButton>
        </ChildrenContainer>
      </InnerContainer>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  padding: 24px 0px;
`;

const InnerContainer = styled.div`
  padding: 0px 36px;
  height: 100%;

  border-left: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 287px;
  height: 100%;
`;
