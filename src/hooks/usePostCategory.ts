import { postNewCategory } from '@/apis/categoryApi';
import { ServiceType } from '@/types/category.type';
import { useMutation } from '@tanstack/react-query';

// TODO: 삭제
export const usePostNewCategory = () => {
  const createNewCategory = useMutation({
    mutationFn: async ({
      categoryName,
      categoryType,
    }: {
      categoryName: string;
      categoryType: ServiceType;
    }) => {
      const convertedType = categoryType === 'QUIZ' ? 'PROBLEM' : categoryType;
      const response = await postNewCategory(categoryName, convertedType);
      return response.data;
    },
  });

  return createNewCategory;
};
