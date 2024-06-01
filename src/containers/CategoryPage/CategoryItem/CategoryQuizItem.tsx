import { ReactComponent as DeleteIcon } from '@/assets/icons/trash.svg';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import {
  StyledCategoryItemContainer,
  StyledCategoryItemInnerContainer,
} from '@/containers/CategoryPage/CategoryItem/CategoryItem.style';
import CategoryItemDateInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemDateInfo';
import CategoryItemTitleInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemTitleInfo';
import { QuizCategoryItemType } from '@/types/category.type';
import { useState } from 'react';

const QUIZ_TYPE = {
  MULTIPLE: '객관식',
  SUBJECTIVE: '주관식',
};

const GENERATED_BY: { [key: string]: string } = {
  MEMBER: '자체',
  AI: 'AI',
};

interface CategoryQuizItemProps {
  quizItem: QuizCategoryItemType;
  handleDeleteItem: (id: number) => void;
}
function CategoryQuizItem({
  quizItem,
  handleDeleteItem,
}: CategoryQuizItemProps) {
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
          title="퀴즈를 삭제하시겠습니까?"
        />
      )}
      <StyledCategoryItemContainer
        onClick={() => {
          // TODO: 상세 퀴즈 페이지로 이동
        }}
        $itemType="QUIZ"
      >
        <StyledCategoryItemInnerContainer>
          <div className="children-container">
            <CategoryItemTitleInfo
              createInfo={`${GENERATED_BY[quizItem.problemGeneratedBy]} 생성 / ${Object.entries(QUIZ_TYPE).find(([_, value]) => value === quizItem.problemType)?.[0]}`}
              title={`Q. ${quizItem.problemName}`}
            />
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
          createDate={quizItem.createTime}
          updateDate={quizItem.updateTime}
        />
      </StyledCategoryItemContainer>
    </>
  );
}

export default CategoryQuizItem;
