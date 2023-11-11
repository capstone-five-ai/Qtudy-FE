import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { HEADER_MENU_LIST } from '../../constants';

function MenuBar() {
  const location = useLocation();
  const [login, setLogin] = useState<boolean>(true); // 로그인 여부를 표현하기 위한 임시 수단

  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
    setLogin(false);
  };

  const handleLogin = () => {
    // TODO: 로그인 기능 구현
    setLogin(true);
  };

  return (
    <Container>
      {HEADER_MENU_LIST.map((menu) => (
        <Link key={menu.menu} to={menu.path} style={{ textDecoration: 'none' }}>
          <MenuButton className={`menu-button ${location.pathname === menu.path ? 'active' : undefined}`}>
            {menu.menu}
          </MenuButton>
        </Link>
      ))}
      {login ? (
        <MenuButton className="logout-button" type="button" onClick={handleLogout}>
          로그아웃
        </MenuButton>
      ) : (
        <MenuButton className="login-button" type="button" onClick={handleLogin}>
          <img alt="kakao-login-icon" src="/src/assets/icons/icon_kakao.svg" />
          <span>Login</span>
        </MenuButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;

  .menu-button {
    padding: 12px 2px;
    color: ${(props) => props.theme.colors.grayScale03};

    &:hover {
      color: ${(props) => props.theme.colors.grayScale02};
      border-bottom: solid 2px;
      border-color: ${(props) => props.theme.colors.mainMint};
    }
  }

  .logout-button {
    color: ${(props) => props.theme.colors.grayScale04};

    &:hover {
      color: ${(props) => props.theme.colors.grayScale02};
    }
  }

  .login-button {
    color: ${(props) => props.theme.colors.kakaoBlack};
    background-color: ${(props) => props.theme.colors.kakaoYellow};
    padding: 12px 16px;
    border-radius: 6px;
  }

  .active {
    color: ${(props) => props.theme.colors.grayScale02};
    border-bottom: solid 2px;
    border-color: ${(props) => props.theme.colors.mainMint};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  font-family: NotoSansMedium;
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default MenuBar;
