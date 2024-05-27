import { ReactNode } from 'react';
import { atom } from 'recoil';

const toastState = atom({
  key: 'toastState',
  default: '',
});

export const toastIconState = atom<ReactNode>({
  key: 'toastIconState',
  default: null,
});

export default toastState;
