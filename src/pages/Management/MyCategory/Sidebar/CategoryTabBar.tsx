import styled from 'styled-components';
import { CategoryType } from '../../../../types';
import Typography from '../../../../components/Typography';

const TAB_LIST: CategoryType[] = ['퀴즈', '요약'];

interface CategoryTabBarProps {
  activeTabBar: CategoryType;
  setActiveTabBar: React.Dispatch<React.SetStateAction<CategoryType>>;
}

function CategoryTabBar({ activeTabBar, setActiveTabBar }: CategoryTabBarProps) {
  return (
    <Container>
      {TAB_LIST.map((tab) => (
        <TabBar key={tab} $active={activeTabBar === tab} onClick={() => setActiveTabBar(tab)}>
          <Typography variant="button" color={activeTabBar === tab ? 'mainMintDark' : 'grayScale03'}>
            {tab}
          </Typography>
        </TabBar>
      ))}
    </Container>
  );
}

export default CategoryTabBar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding: 6px 22px;
  border-radius: 26px;
  background: ${(props) => props.theme.colors.grayScale09};
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.4);
`;

const TabBar = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  border-radius: 30px;
  border: 1px solid;
  cursor: pointer;

  border-color: ${(props) => (props.$active ? props.theme.colors.mainMintDark : 'transparent')};
`;
