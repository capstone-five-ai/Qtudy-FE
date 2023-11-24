import styled from 'styled-components';
import Typography from '../Typography';

interface TabBarProps {
  tabList: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function TabBar({ tabList, activeTab, setActiveTab }: TabBarProps) {
  return (
    <Wrapper>
      {tabList.map((tab) => (
        <TabButton key={tab} $active={tab === activeTab} onClick={() => setActiveTab(tab)}>
          <Typography variant="subtitle" color={tab === activeTab ? 'mainMintDark' : 'grayScale03'}>
            {tab}
          </Typography>
        </TabButton>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

export default TabBar;
