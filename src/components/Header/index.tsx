import styled from 'styled-components';
import { useState } from 'react';
import MenuBar from './MenuBar';
import { ReactComponent as Logo } from '../../assets/logo/logo_main.svg';
import Typography from '../Typography';
import KakaoLoginSmallButton from '../Button/KakaoLoginSmallButton';

function Header() {
  const [login, setLogin] = useState<boolean>(true);

  const handleLogin = () => {
    // TODO: 로그인 기능 구현
    setLogin(true);
  };

  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
    setLogin(false);
  };

  return (
    <Container>
      <InnerContainer>
        <div className="menu-list">
          <Logo className="logo-icon" width="113px" height="60px" />
          <MenuBar />
        </div>
        {login ? (
          <button className="login-button" type="button" onClick={handleLogout}>
            <Typography variant="subtitle" color="grayScale04" hoverColor="grayScale02">
              Logout
            </Typography>
          </button>
        ) : (
          <KakaoLoginSmallButton handleClick={handleLogin} />
        )}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.mainMintLight};

  .logo-icon {
    margin: 0px 45px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  padding-right: 60px;
  min-width: 535px;
  max-width: 1280px;
  height: 64px;

  .menu-list {
    display: flex;
    align-items: center;
  }

  .login-button {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
`;

export default Header;
