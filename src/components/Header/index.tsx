import styled from 'styled-components';
import MenuBar from './MenuBar';

function Header() {
  return (
    <Container>
      <InnerContainer>
        <img alt="main-logo" src="/src/assets/logo/logo_main.svg" width="88px" />
        <MenuBar />
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  background: ${(props) => props.theme.colors.mainMintLight};
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  height: 64px;
  padding: 0px 20px;
  margin: 0 auto;
`;

export default Header;
