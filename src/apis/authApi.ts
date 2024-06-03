import { authClient, noAuthClient, refreshApiClient } from '@/apis/client';

export const getAuthKakao = async (code: string) => {
  const response = await noAuthClient.get(
    `oauth/kakao/callback?code=${code}&redirectUri=${import.meta.env.VITE_REDIRECT_URI}`
  );
  return response.data;
};

export const postLogin = async (accessToken: string) => {
  const response = await noAuthClient.post(
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
};

export const postLogout = async () => {
  const response = await authClient.post('api/logout', null);

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return response.data;
};

export const postUpdateToken = async () => {
  const response = await refreshApiClient.post('api/access-token/issue', null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  });

  return response;
};
