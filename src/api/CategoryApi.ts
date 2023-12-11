import apiClient from './client';

const PAGE = 1;
const SIZE = 100;

const CategoryApi = {
  getCategoryList: async (categoryType: string) => {
    // 카테고리(Category)/카테고리 목록 조회
    const response = await apiClient.get('api/category/list', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      params: {
        page: PAGE,
        size: SIZE,
        categoryType,
      },
    });
    return response.data;
  },

  getCategoryItems: async (categoryId: number) => {
    // 카테고리(Category)/카테고리 단건 조회
    const response = await apiClient.get(`category/${categoryId}`, {
      params: {
        page: PAGE,
        size: SIZE,
      },
    });
    return response.data;
  },

  createCategory: async (categoryName: string, categoryType: string) => {
    // 카테고리(Category)/카테고리 생성
    const response = await apiClient.post('api/category/new', {
      categoryName,
      categoryType,
    });
    return response.data;
  },

  editCategory: async (categoryId: number, categoryName: string) => {
    // 카테고리(Category)/카테고리 수정
    const response = await apiClient.patch(`category/edit/${categoryId}`, {
      categoryName,
    });
    return response.data;
  },

  deleteCategory: async (categoryId: number) => {
    // 카테고리(Category)/카테고리 삭제
    const response = await apiClient.delete(`api/category/delete/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data;
  },
};

export default CategoryApi;
