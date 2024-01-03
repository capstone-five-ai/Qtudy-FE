import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const refreshApiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const updateToken = async () => {
  const response = await refreshApiClient.post('api/access-token/issue', null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  });

  return response;
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originRequest = config;
      try {
        const response = await updateToken();
        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await axios(originRequest);
        }
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
