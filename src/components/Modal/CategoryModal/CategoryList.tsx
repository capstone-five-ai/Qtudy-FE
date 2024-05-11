import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import { CategoryInfoType } from '../../../types';
import CheckBox from '../../Checkbox';
import Typography from '../../Typography';
import Scrollbar from '../../Scrollbar';

type Props = {
  categories: CategoryInfoType[];
  saveCategoryIds: number[];
  setSaveCategoryIds: Dispatch<SetStateAction<number[]>>;
};

function CategoryList({ categories, saveCategoryIds, setSaveCategoryIds }: Props) {
  const handleCheckCategory = (newId: number) => {
    const exist = saveCategoryIds.indexOf(newId);
    if (exist > -1) {
      const newSaveCategoryIds = saveCategoryIds.slice();
      newSaveCategoryIds.splice(exist, 1);

      setSaveCategoryIds(newSaveCategoryIds);
      return;
    }

    const idSet = new Set([...saveCategoryIds, newId]);
    const idArr = Array.from(idSet);

    setSaveCategoryIds(idArr);
  };

  return (
    <Main>
      {categories.map((el) => (
        <Item onClick={() => handleCheckCategory(el.categoryId)} key={el.categoryId}>
          <CheckBox checked={saveCategoryIds.includes(el.categoryId)} />
          <Typography variant="caption3">{el.categoryName}</Typography>
        </Item>
      ))}
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-height: 200px;
  padding: 24px 24px 24px 16px;
  border-radius: 4px;
  background: var(--grayscale07, #fafafa);
  box-shadow: 0px 0px 4px 0px rgba(189, 189, 189, 0.28);

  overflow-y: scroll;
  ${Scrollbar};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: fit-content;
  cursor: pointer;
`;

export default CategoryList;
