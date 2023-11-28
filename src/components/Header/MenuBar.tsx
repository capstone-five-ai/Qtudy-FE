import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { HEADER_MENU_LIST } from '../../constants';
import Typography from '../Typography';

function MenuBar() {
  const location = useLocation();

  return (
    <Container>
      {HEADER_MENU_LIST.map((menu) => (
        <Link key={menu.menu} to={menu.path} style={{ textDecoration: 'none', padding: '0px', margin: '0px' }}>
          <MenuButton>
            <Typography
              variant="subtitle"
              color={location.pathname === menu.path ? 'grayScale02' : 'grayScale03'}
              hoverColor="grayScale02"
            >
              {menu.menu}
            </Typography>
            <ActiveIcon $isActive={location.pathname === menu.path} />
          </MenuButton>
        </Link>
      ))}
    </Container>
  );
}

export default MenuBar;

const ActiveIcon = styled.div<{ $isActive: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: -9px;

  ${(props) =>
    props.$isActive &&
    css`
      background: ${props.theme.colors.mainMint};
      box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 44px;
`;

const MenuButton = styled.div`
  position: relative;
  cursor: pointer;

  &:hover ${ActiveIcon} {
    background: ${(props) => props.theme.colors.mainMint};
    box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
  }
`;
