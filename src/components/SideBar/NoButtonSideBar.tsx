import styled from 'styled-components';
import { ReactNode } from 'react';

interface NoButtonSideBarProps {
  children?: ReactNode;
}

NoButtonSideBar.defaultProps = {
  children: null,
};

function NoButtonSideBar({ children }: NoButtonSideBarProps) {
  return (
    <Container>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
}

export default NoButtonSideBar;

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
