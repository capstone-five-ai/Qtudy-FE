import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import Typography from '@/components/Typography/Typography';
import {
  StyledCategoryItemContainer,
  StyledCategoryItemInnerContainer,
} from '@/containers/CategoryPage/CategoryItem/CategoryItem.style';
import CategoryItemDateInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemDateInfo';
import CategoryItemTitleInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemTitleInfo';
import { SummaryCategoryItemType } from '@/types/category.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GENERATED_BY: { [key: string]: string } = {
  MEMBER: '자체',
  AI: 'AI',
};

interface CategorySummaryItemProps {
  activeCategoryId: string;
  summaryItem: SummaryCategoryItemType;
  handleDeleteItem: (id: number) => void;
}
function CategorySummaryItem({
  activeCategoryId,
  summaryItem,
  handleDeleteItem,
}: CategorySummaryItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            handleDeleteItem(summaryItem.categorizedSummaryId);
          }}
          title="요약을 삭제하시겠습니까?"
        />
      )}
      <StyledCategoryItemContainer
        onClick={() => {
          navigate(
            `/management/category/summary?categoryId=${activeCategoryId}&id=${summaryItem.categorizedSummaryId}`
          );
        }}
        $itemType="SUMMARY"
      >
        <StyledCategoryItemInnerContainer>
          <div className="children-container">
            <CategoryItemTitleInfo
              createInfo={`${GENERATED_BY[summaryItem.summaryGeneratedBy]} 생성`}
              title={summaryItem.summaryTitle}
            />
            <ContentContainer>
              <Typography variant="caption3" color="grayScale02">
                {summaryItem.summaryContent}
              </Typography>
            </ContentContainer>
          </div>
          <DeleteIcon
            width={20}
            height={20}
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
          />
        </StyledCategoryItemInnerContainer>
        <CategoryItemDateInfo
          createDate={summaryItem.createTime}
          updateDate={summaryItem.updateTime}
        />
      </StyledCategoryItemContainer>
    </>
  );
}

export default CategorySummaryItem;

const ContentContainer = styled.div`
  height: 38px;
  text-align: left;

  & > div {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
`;
