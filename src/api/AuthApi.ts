import apiClient from './client';

const AuthApi = {
  authKakao: async (code: string) => {
    const response = await apiClient.get(`oauth/kakao/callback?code=${code}`);
    return response.data;
  },

  login: async (accessToken: string) => {
    const response = await apiClient.post(
      'api/oauth/login',
      {
        memberType: 'KAKAO',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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
