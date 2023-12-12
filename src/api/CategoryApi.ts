import getAccessToken from '../utils/getAccessToken';
import apiClient from './client';

const PAGE = 1;
const SIZE = 20;

const headers = {
  Authorization: `Bearer ${getAccessToken()}`,
};

const CategoryApi = {
  getCategorys: async (categoryType: string) => {
    // 카테고리(Category)/카테고리 목록 조회
    const response = await apiClient.get('api/category/list', {
      params: {
        page: PAGE,
        size: SIZE,
        categoryType,
      },
      headers,
    });
    return response.data;
  },

  saveSummaryToCategory: async (categoryIdList: number[], summaryId: number, type: 'ai' | 'user') => {
    let id;
    if (type === 'ai')
      id = {
        aiGeneratedSummaryId: summaryId,
      };
    if (type === 'user')
      id = {
        memberSavedSummaryId: summaryId,
      };
    // 카테고리(Category)/요약 카테고리에 저장
    const response = await apiClient.post(`api/categorized-summary/new`, {
      categoryIdList,
      ...id,
    });
    return response.data;
  },

  saveProblemToCategory: async (categoryIdList: number[], problemId: number, type: 'ai' | 'user') => {
    let id;
    if (type === 'ai')
      id = {
        aiGeneratedProblemId: problemId,
      };
    if (type === 'user')
      id = {
        memberSavedProblemId: problemId,
      };
    // 카테고리(Category)/문제 카테고리에 저장
    const response = await apiClient.post(`api/categorized-problem/new`, {
      categoryIdList,
      ...id,
    });
    return response.data;
  },

  getCategoryItems: async (categoryId: number) => {
    // 카테고리(Category)/카테고리 단건 조회
    const response = await apiClient.get(`api/category/${categoryId}`, {
      params: {
        page: PAGE,
        size: SIZE,
      },
    });
    return response.data;
  },

  createCategory: async (categoryName: string, categoryType: string) => {
    // 카테고리(Category)/카테고리 생성
    const response = await apiClient.post(
      'api/category/new',
      {
        categoryName,
        categoryType,
      },
      {
        headers,
      }
    );
    return response.data;
  },

  editCategory: async (categoryId: number, categoryName: string) => {
    // 카테고리(Category)/카테고리 수정
    const response = await apiClient.patch(`api/category/edit/${categoryId}`, {
      categoryName,
    });
    return response.data;
  },

  deleteCategory: async (categoryId: number) => {
    // 카테고리(Category)/카테고리 삭제
    const response = await apiClient.delete(`api/category/edit/${categoryId}`);
    return response.data;
  },
};

export default CategoryApi;
