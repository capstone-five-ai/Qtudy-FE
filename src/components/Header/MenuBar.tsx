import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HEADER_MENU_LIST } from '../../constants';
import Typography from '../Typography';
import Tooltip from '../Tooltip';
import tooltipSelector from '../../recoil/selectors/tooltip';

function MenuBar() {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useRecoilState(tooltipSelector);
  const location = useLocation();

  useEffect(() => {
    let timeout: number;
    if (currentPath === null || !location.pathname.includes(currentPath)) {
      setShowTooltip(true);
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      handleChangeCurrentPath(location.pathname);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleChangeCurrentPath = (pathname: string) => {
    if (pathname.includes('quiz')) setCurrentPath('quiz');
    else if (pathname.includes('summary')) setCurrentPath('summary');
    else if (pathname.includes('management')) setCurrentPath('management');
  };

  return (
    <Container>
      {HEADER_MENU_LIST.map((menu) => (
        <Link key={menu.menu} to={menu.defaultPath} style={{ textDecoration: 'none' }}>
          <MenuButton>
            <Typography
              variant="subtitle"
              color={location.pathname.includes(menu.path) ? 'grayScale02' : 'grayScale03'}
              hoverColor="grayScale02"
            >
              {menu.menu}
            </Typography>
            <ActiveIcon $isActive={location.pathname.includes(menu.path)} />
          </MenuButton>
        </Link>
      ))}
      {showTooltip && <Tooltip />}
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
  position: relative;
  z-index: 3;
`;

const MenuButton = styled.div`
  position: relative;
  width: max-content;
  cursor: pointer;
  z-index: 4;

  &:hover ${ActiveIcon} {
    background: ${(props) => props.theme.colors.mainMint};
    box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
  }
`;
