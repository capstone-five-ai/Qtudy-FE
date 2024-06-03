import { ServiceType } from '@/types/category.type';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CategoryTabBarProps {
  currentType: ServiceType;
}

function CategoryTabBar({ currentType }: CategoryTabBarProps) {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledTabBar
        $active={currentType === 'QUIZ'}
        onClick={() => navigate(`/management/category?type=quiz`)}
      >
        <span>퀴즈</span>
      </StyledTabBar>
      <StyledTabBar
        $active={currentType === 'SUMMARY'}
        onClick={() => navigate(`/management/category?type=summary`)}
      >
        <span>요약</span>
      </StyledTabBar>
    </StyledContainer>
  );
}

export default CategoryTabBar;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 22px;
  margin-right: 16px;
  border-radius: 26px;
  background: ${(props) => props.theme.colors.grayScale09};
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.4);
`;

const StyledTabBar = styled.button<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 130px;
  height: 40px;

  border-radius: 30px;
  border: 1px solid;

  border-color: ${(props) =>
    props.$active ? props.theme.colors.mainMintDark : 'transparent'};

  span {
    ${({ theme }) => theme.typography.button};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.mainMintDark : theme.colors.grayScale03};
  }
`;
