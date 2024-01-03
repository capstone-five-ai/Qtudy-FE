const redirectURI = import.meta.env.VITE_REDIRECT_URI;
const clientID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const loginPath = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`;

const navigateToLogin = () => {
  window.location.href = loginPath;
};

export default navigateToLogin;
