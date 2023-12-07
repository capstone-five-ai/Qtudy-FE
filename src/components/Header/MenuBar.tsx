import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { HEADER_MENU_LIST } from '../../constants';
import Typography from '../Typography';
import Tooltip from '../Tooltip';
import tooltipSelector from '../../recoil/selectors/tooltip';

function MenuBar() {
  const [showTooltip, setShowTooltip] = useRecoilState(tooltipSelector);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;

    if (showTooltip) {
      timer = setTimeout(() => setShowTooltip(false), 5000);
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Container>
      {HEADER_MENU_LIST.map((menu) => (
        <MenuButton
          key={menu.menu}
          onClick={() => {
            setShowTooltip(true);
            navigate(menu.path);
          }}
        >
          <Typography
            variant="subtitle"
            color={location.pathname === menu.path ? 'grayScale02' : 'grayScale03'}
            hoverColor="grayScale02"
          >
            {menu.menu}
          </Typography>
          <ActiveIcon $isActive={location.pathname === menu.path} />
        </MenuButton>
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
