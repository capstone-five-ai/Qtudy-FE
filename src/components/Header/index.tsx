import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/">
            <Logo width="113px" height="60px" style={{ marginRight: '60px' }} />
          </Link>
          <MenuBar />
        </div>
        {login ? (
          <LogoutButton type="button" onClick={handleLogout}>
            <Typography variant="subtitle" color="grayScale04" hoverColor="grayScale02">
              Logout
            </Typography>
          </LogoutButton>
        ) : (
          <KakaoLoginSmallButton handleClick={handleLogin} />
        )}
      </InnerContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  background: ${(props) => props.theme.colors.mainMintLight};
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0px 20px;
  max-width: 1200px;
  height: 64px;

  .menu-list {
    display: flex;
    align-items: center;
  }
`;

const LogoutButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;
