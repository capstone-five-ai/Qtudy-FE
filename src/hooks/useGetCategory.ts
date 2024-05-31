import { getCategoryList } from '@/apis/categoryApi';
import { ServiceType } from '@/types/category.type';
import { useQuery } from '@tanstack/react-query';

export const useGetCategoryList = (categoryType: ServiceType) => {
  const convertCategoryType =
    categoryType === 'QUIZ' ? 'PROBLEM' : categoryType;
  return useQuery({
    queryKey: ['getCategoryList', categoryType],
    queryFn: () => getCategoryList(convertCategoryType),
    enabled: !!categoryType,
  });
};
