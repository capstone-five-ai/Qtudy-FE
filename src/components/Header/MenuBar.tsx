import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import HEADER_MENU_LIST from '../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;

  .menu-button {
    padding: 12px 2px;
    color: ${(props) => props.theme.colors.grayScale03};
  }

  .logout-button {
    color: ${(props) => props.theme.colors.grayScale04};
  }

  .active {
    color: ${(props) => props.theme.colors.grayScale02};
    border-bottom: solid 2px;
    border-color: ${(props) => props.theme.colors.mainMint};
  }
`;

const MenuButton = styled.button`
  font-family: NotoSansMedium;
  font-size: 14px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

function MenuBar() {
  const location = useLocation();
  const [login, setLogin] = useState<boolean>(true);

  const handleLogout = () => {
    // TODO: 로그아웃 기능 구현
    setLogin(false);
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
      ) : null}
    </Container>
  );
}

export default MenuBar;
