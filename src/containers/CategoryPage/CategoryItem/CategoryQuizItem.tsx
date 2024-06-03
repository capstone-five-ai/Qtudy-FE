import DeleteIcon from '@/components/Icon/DeleteIcon';
import DeleteItemModal from '@/components/Modal/DeleteItemModal';
import {
  StyledCategoryItemContainer,
  StyledCategoryItemInnerContainer,
} from '@/containers/CategoryPage/CategoryItem/CategoryItem.style';
import CategoryItemDateInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemDateInfo';
import CategoryItemTitleInfo from '@/containers/CategoryPage/CategoryItem/CategoryItemTitleInfo';
import { QuizCategoryItemType } from '@/types/category.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QUIZ_TYPE: { [key: string]: string } = {
  MULTIPLE: '객관식',
  SUBJECTIVE: '주관식',
};

const GENERATED_BY: { [key: string]: string } = {
  MEMBER: '자체',
  AI: 'AI',
};

interface CategoryQuizItemProps {
  activeCategoryId: string;
  quizItem: QuizCategoryItemType;
  handleDeleteItem: (id: number) => void;
}
function CategoryQuizItem({
  activeCategoryId,
  quizItem,
  handleDeleteItem,
}: CategoryQuizItemProps) {
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
            handleDeleteItem(quizItem.categorizedProblemId);
          }}
          title="퀴즈를 삭제하시겠습니까?"
        />
      )}
      <StyledCategoryItemContainer
        onClick={() => {
          navigate(
            `/management/category/quiz?categoryId=${activeCategoryId}&id=${quizItem.categorizedProblemId}`
          );
        }}
        $itemType="QUIZ"
      >
        <StyledCategoryItemInnerContainer>
          <div className="children-container">
            <CategoryItemTitleInfo
              createInfo={`${GENERATED_BY[quizItem.problemGeneratedBy]} 생성 / ${QUIZ_TYPE[quizItem.problemType]}`}
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
