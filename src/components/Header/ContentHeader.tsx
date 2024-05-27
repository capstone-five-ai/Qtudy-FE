import { HEADER_MENU_LIST } from '@/constants';
import { Link, Navigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

function ContentHeader() {
  const location = useLocation();
  const currentContent = HEADER_MENU_LIST.find((menu) =>
    location.pathname.includes(menu.path)
  );

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
            <Link
              to={currentContent.path + tabItem.path}
              style={{ textDecoration: 'none' }}
              key={tabItem.tab}
            >
              <TabButton
                key={tabItem.tab}
                $active={location.pathname.includes(tabItem.path)}
              >
                {tabItem.tab}
              </TabButton>
            </Link>
          ))}
        </StyledTabContainer>
      </>
    );
}

export default ContentHeader;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
