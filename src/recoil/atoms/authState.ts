import { atom } from 'recoil';

const authState = atom<boolean>({
  key: 'authState',
  default: !!localStorage.getItem('accessToken'),
});

export default authState;
