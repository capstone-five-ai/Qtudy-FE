import AnnouncementTooltip from '@/components/Tooltip/AnnouncementTooltip';
import { HEADER_MENU_LIST } from '@/constants';
import tooltipState from '@/recoils/atoms/tooltipState';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

function MenuBar() {
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useRecoilState(tooltipState);

  useEffect(() => {
    const majorPaths = ['quiz', 'summary', 'management'];
    const isMajorPath = majorPaths.some((path) =>
      location.pathname.startsWith(`${path}`)
    );

    if (isMajorPath) {
      let timeout: number;
      setShowTooltip(true);
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  const isActivePath = (menuPath: string) => {
    const currentPath = location.pathname;
    return currentPath === menuPath || currentPath.startsWith(`${menuPath}/`);
  };

  return (
    <StyledContainer>
      {HEADER_MENU_LIST.map((menu) => (
        <Link
          key={menu.header.title}
          to={menu.path}
          style={{ textDecoration: 'none' }}
        >
          <StyledMenuButton $isActive={isActivePath(menu.path)}>
            {menu.header.title}
            <StyledActiveIcon $isActive={isActivePath(menu.path)} />
          </StyledMenuButton>
        </Link>
      ))}
      {showTooltip && <AnnouncementTooltip />}
    </StyledContainer>
  );
}

export default MenuBar;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 44px;

  position: relative;
  z-index: 3;
`;

const StyledActiveIcon = styled.div<{ $isActive: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: -9px;

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      background: ${theme.colors.mainMint};
      box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
    `}
`;

const StyledMenuButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  width: max-content;
  z-index: 4;

  ${({ theme }) => theme.typography.subtitle};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.grayScale02 : theme.colors.grayScale03};

  &:hover {
    color: ${({ theme }) => theme.colors.grayScale02};
    ${StyledActiveIcon} {
      background: ${(props) => props.theme.colors.mainMint};
      box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
    }
  }
`;
