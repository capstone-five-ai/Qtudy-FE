import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import Typography from '@/components/Typography/Typography';
import {
  StyledCategoryItemContainer,
  StyledCategoryItemInnerContainer,
} from '@/containers/CategoryPage/CategoryItem/CategoryItem.style';
import CategoryItemDateInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemDateInfo';
import CategoryItemTitleInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemTitleInfo';
import { useState } from 'react';
import styled from 'styled-components';

const GENERATED_BY: { [key: string]: string } = {
  MEMBER: '자체',
  AI: 'AI',
};

// TODO: 임시 타입
type QuizType = 'SUBJECTIVE' | 'MULTIPLE';

interface CategorySummaryItemsType {
  categorizedSummaryId: number;
  summaryGeneratedBy: string;
  summaryTitle: string;
  summaryContent: string;
  createTime: string;
  updateTime: string;
}

interface CategorySummaryItemProps {
  summaryItem: CategorySummaryItemsType;
  handleDeleteItem: (id: number) => void;
}
function CategorySummaryItem({
  summaryItem,
  handleDeleteItem,
}: CategorySummaryItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          onCancel={() => {
            setShowDeleteModal(false);
          }}
          onConfirm={() => {
            // TODO: index 반영
            handleDeleteItem(1);
          }}
          title="요약을 삭제하시겠습니까?"
        />
      )}
      <StyledCategoryItemContainer
        onClick={() => {
          // TODO: 상세 요약 페이지로 이동
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
        <CategoryItemDateInfo createDate="" updateDate="" />
      </StyledCategoryItemContainer>
    </>
  );
}

export default CategorySummaryItem;

const ContentContainer = styled.div`
  height: 38px;

  & > div {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
`;
