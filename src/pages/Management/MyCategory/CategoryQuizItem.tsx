import { GENERATED_BY } from '../../../constants';
import { CategoryQuizItemsType } from '../../../types';
import CategoryItemContainer from './CategoryItemContainer';
import CategoryItemInfo from './CategoryItemInfo';

const QUIZ_TYPE = {
  MULTIPLE: '객관식',
  SUBJECTIVE: '주관식',
};
interface CategoryQuizItemProps {
  quizItem: CategoryQuizItemsType;
  handleDeleteQuizItem: (id: number) => void;
}
function CategoryQuizItem({ quizItem, handleDeleteQuizItem }: CategoryQuizItemProps) {
  return (
    <CategoryItemContainer
      createDate={quizItem.createTime}
      updateDate={quizItem.updateTime}
      handleDeleteItem={() => handleDeleteQuizItem(quizItem.categorizedProblemId)}
    >
      <CategoryItemInfo
        createInfo={`${GENERATED_BY[quizItem.problemGeneratedBy]} / ${QUIZ_TYPE[quizItem.problemType]}`}
        title={`Q. ${quizItem.problemName}`}
      />
    </CategoryItemContainer>
  );
}

export default CategoryQuizItem;
