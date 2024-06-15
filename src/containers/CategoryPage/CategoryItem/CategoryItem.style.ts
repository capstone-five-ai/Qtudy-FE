import { ServiceType } from '@/types/category.type';
import styled from 'styled-components';

export const StyledCategoryItemContainer = styled.button<{
  $itemType: ServiceType;
}>`
  display: flex;
  flex-direction: column;
  gap: 14px;

  width: 728px;
  padding: ${(props) =>
    props.$itemType === 'QUIZ' ? '18.5px' : '19.5px 19px'};
  border-radius: 8px;
  border: 1px solid rgba(224, 224, 224, 0.8);
  background: ${(props) => props.theme.colors.grayScale09};

  .icon {
    flex-shrink: 0;
    cursor: pointer;
    path {
      stroke: transparent;
    }
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.mainMint};

    path {
      stroke: ${(props) => props.theme.colors.grayScale04};
    }
  }
`;

export const StyledCategoryItemInnerContainer = styled.div`
  display: flex;
  width: 100%;

  .children-container {
    display: flex;
    flex-direction: column;
    gap: 14px;

    width: 100%;
    overflow: hidden;
  }
`;
