import apiClient from './client';

const AuthApi = {
  login: async () => {
    // 회원(Member)/카카오 로그인(회원가입)
    const response = await apiClient.post('oauth/login', null);
    return response.data;
  },

  logout: async () => {
    // 회원(Member)/로그아웃
    const response = await apiClient.post('logout', null);
    return response.data;
  },

  updateToken: async () => {
    // 회원(Member)/Access 토큰 재발급
    const response = await apiClient.post('access-token/issue', null);
    return response.data;
  },
};

export default AuthApi;
