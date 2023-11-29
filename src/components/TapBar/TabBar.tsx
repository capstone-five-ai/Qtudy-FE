import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography';
import { TabType } from '../../types';

interface TabBarProps {
  tabList: TabType[];
}

function TabBar({ tabList }: TabBarProps) {
  const location = useLocation();

  return (
    <Container>
      {tabList.map((tabItem) => (
        <Link to={tabItem.path} style={{ textDecoration: 'none' }}>
          <TabButton key={tabItem.tab} $active={tabItem.path === location.pathname}>
            <Typography variant="subtitle" color={tabItem.path === location.pathname ? 'mainMintDark' : 'grayScale03'}>
              {tabItem.tab}
            </Typography>
          </TabButton>
        </Link>
      ))}
    </Container>
  );
}

export default TabBar;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.grayScale06};
`;

const TabButton = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 60px;

  border-bottom: 2px solid;
  border-color: ${(props) => (props.$active ? props.theme.colors.mainMint : 'transparent')};
  cursor: pointer;
`;
