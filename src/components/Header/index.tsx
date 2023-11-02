import styled from 'styled-components';
import MainWrapper from '../Wrapper/MainWrapper';
import MenuBar from './MenuBar';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: ${(props) => props.theme.colors.mainMintLight};
`;

function Header() {
  return (
    <MainWrapper>
      <Container>
        <img alt="main-logo" src="/src/assets/logo/logo_main.svg" width="88px" />
        <MenuBar />
      </Container>
    </MainWrapper>
  );
}

export default Header;
