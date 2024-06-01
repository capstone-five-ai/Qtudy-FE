import { authClient } from '@/apis/client';

// 한 번에 가져올 수 있도록 해야함
const PAGE = 1;
const SIZE = 100;

export const getCategoryList = async (categoryType: string) => {
  const response = await authClient.get('api/category/list', {
    params: {
      page: PAGE,
      size: SIZE,
      categoryType: categoryType,
    },
  });
  return response.data;
};

export const getCategoryDetailList = async (categoryId: string) => {
  const response = await authClient.get(`api/category/${categoryId}`, {
    params: {
      page: PAGE,
      size: SIZE,
      categoryId: categoryId,
    },
  });
  return response.data;
};

export const postNewCategory = async (
  categoryName: string,
  categoryType: string
) => {
  const response = await authClient.post('api/category/new', {
    categoryName: categoryName,
    categoryType: categoryType,
  });
  return response.data;
};
