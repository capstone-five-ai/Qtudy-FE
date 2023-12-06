import styled from 'styled-components';
import { CategorySummaryItemsType } from '../../../types';
import Typography from '../../../components/Typography';
import CategoryItemContainer from './CategoryItemContainer';
import CategoryItemInfo from './CategoryItemInfo';
import { GENERATED_BY } from '../../../constants';

interface CategorySummaryItemProps {
  summaryItem: CategorySummaryItemsType;
  handleDeleteSummaryItem: (id: number) => void;
}

function CategorySummaryItem({ summaryItem, handleDeleteSummaryItem }: CategorySummaryItemProps) {
  return (
    <CategoryItemContainer
      createDate={summaryItem.createTime}
      updateDate={summaryItem.updateTime}
      handleDeleteItem={() => handleDeleteSummaryItem(summaryItem.categorizedSummaryId)}
    >
      <CategoryItemInfo createInfo={GENERATED_BY[summaryItem.summaryGeneratedBy]} title={summaryItem.summaryTitle} />
      <ContentContainer>
        <Typography variant="caption3" color="grayScale02">
          {summaryItem.summaryContent}
        </Typography>
      </ContentContainer>
    </CategoryItemContainer>
  );
}

export default CategorySummaryItem;

const ContentContainer = styled.div`
  & > div {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
`;
