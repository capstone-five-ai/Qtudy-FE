import AnnouncementTooltip from '@/components/Tooltip/AnnouncementTooltip';
import tooltipState from '@/recoils/atoms/tooltipState';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

// TODO: path 수정
const HEADER_MENU_LIST = [
  { menu: '퀴즈 생성', path: '/' },
  { menu: '요약정리 생성', path: '/' },
  { menu: '관리 및 복습', path: '/' },
];

function MenuBar() {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useRecoilState(tooltipState);
  const location = useLocation();

  useEffect(() => {
    let timeout: number;
    if (currentPath === null || !location.pathname.includes(currentPath)) {
      setShowTooltip(true);
      timeout = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      handleChangeCurrentPath(location.pathname);
    }

    return () => clearTimeout(timeout);
  }, []);

  // TODO: path에 맞춰 수정
  const handleChangeCurrentPath = (pathname: string) => {
    if (pathname.includes('quiz')) setCurrentPath('quiz');
    else if (pathname.includes('summary')) setCurrentPath('summary');
    else if (pathname.includes('management')) setCurrentPath('management');
  };

  return (
    <StyledContainer>
      {HEADER_MENU_LIST.map((menu) => (
        <Link key={menu.menu} to={menu.path} style={{ textDecoration: 'none' }}>
          <StyledMenuButton $isActive={location.pathname.includes(menu.path)}>
            {menu.menu}
            <StyledActiveIcon
              $isActive={location.pathname.includes(menu.path)}
            />
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

  // 이거 삭제해도 되는 거 아닐까?
  &:hover ${StyledActiveIcon} {
    background: ${(props) => props.theme.colors.mainMint};
    box-shadow: 2px 1px 4px rgba(54, 189, 180, 0.24);
  }

  ${({ theme }) => theme.typography.subtitle};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.grayScale02 : theme.colors.grayScale03};
`;
