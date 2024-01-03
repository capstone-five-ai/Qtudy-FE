import apiClient from './client';

const AuthApi = {
  authKakao: async (code: string) => {
    const response = await apiClient.get(
      `oauth/kakao/callback?code=${code}&redirectUri=${import.meta.env.VITE_REDIRECT_URI}`
    );
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
    const response = await apiClient.post('api/logout', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return response.data;
  },
};

export default AuthApi;
