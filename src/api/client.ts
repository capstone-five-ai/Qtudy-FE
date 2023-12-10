import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const updateToken = async () => {
  const response = await apiClient.post('api/access-token/issue', null, {
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
      const response = await updateToken();

      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(originRequest);
      }
      if (response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
