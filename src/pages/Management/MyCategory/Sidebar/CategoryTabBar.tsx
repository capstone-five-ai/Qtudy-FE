import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../../../../components/Typography';
import { CategoryTypeMapping } from '../../../../types/category.type';
import { CATEGORY_TYPE_MAPPING } from '../../../../constants';

interface CategoryTabBarProps {
  currentType: keyof CategoryTypeMapping;
}

function CategoryTabBar({ currentType }: CategoryTabBarProps) {
  const navigate = useNavigate();
  return (
    <Container>
      <TabBar
        $active={CATEGORY_TYPE_MAPPING[currentType].ko === '퀴즈'}
        onClick={() => navigate(`/management/mycategory?type=quiz`)}
      >
        <Typography
          variant="button"
          color={CATEGORY_TYPE_MAPPING[currentType].ko === '퀴즈' ? 'mainMintDark' : 'grayScale03'}
        >
          퀴즈
        </Typography>
      </TabBar>
      <TabBar
        $active={CATEGORY_TYPE_MAPPING[currentType].ko === '요약'}
        onClick={() => navigate(`/management/mycategory?type=summary`)}
      >
        <Typography
          variant="button"
          color={CATEGORY_TYPE_MAPPING[currentType].ko === '요약' ? 'mainMintDark' : 'grayScale03'}
        >
          요약
        </Typography>
      </TabBar>
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
