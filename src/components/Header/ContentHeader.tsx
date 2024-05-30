import LoginModal from '@/components/Modal/LoginModal';
import { HEADER_MENU_LIST } from '@/constants';
import authState from '@/recoils/atoms/authState';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

function ContentHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useRecoilValue(authState);
  const currentContent = HEADER_MENU_LIST.find((menu) =>
    location.pathname.includes(menu.path)
  );
  const [showModal, setShowModal] = useState(false);

  if (currentContent && location.pathname === currentContent.path)
    return <Navigate to={currentContent.path + currentContent.tabs[0].path} />;

  if (currentContent)
    return (
      <>
        <StyledContentContainer>
          <div className="title">{currentContent.header.title}</div>
          <div className="subtitle">{currentContent.header.subtitle}</div>
        </StyledContentContainer>
        <StyledTabContainer>
          {currentContent.tabs.map((tabItem) => (
            <TabButton
              key={tabItem.tab}
              $active={location.pathname.includes(tabItem.path)}
              onClick={() => {
                if (isAuthenticated) {
                  navigate(currentContent.path + tabItem.path);
                } else {
                  setShowModal(true);
                }
              }}
            >
              {tabItem.tab}
            </TabButton>
          ))}
        </StyledTabContainer>
        {showModal && (
          <LoginModal
            onConfirm={() => {
              setShowModal(false);
              navigate('/login');
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </>
    );
}

export default ContentHeader;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  text-align: center;
  width: 100%;
  padding: 28px 0px 20px;

  .title {
    ${({ theme }) => theme.typography.h3};
    color: ${({ theme }) => theme.colors.grayScale02};
  }

  .subtitle {
    ${({ theme }) => theme.typography.detail};
    color: ${({ theme }) => theme.colors.grayScale03};
  }
`;

const StyledTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 60px;

  border-bottom: 2px solid;
  ${({ theme }) => theme.typography.subtitle};

  ${({ $active, theme }) => css`
    border-color: ${$active ? theme.colors.mainMint : theme.colors.grayScale09};
    color: ${$active ? theme.colors.mainMintDark : theme.colors.grayScale03};
  `}
`;
