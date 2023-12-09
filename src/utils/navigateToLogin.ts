const redirectURI = 'http://localhost:5173';
const clientID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const loginPath = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}/oauth/kakao/callback&response_type=code`;

const navigateToLogin = () => {
  window.location.href = loginPath;
};

export default navigateToLogin;
