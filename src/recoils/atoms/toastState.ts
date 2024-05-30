import { atom } from 'recoil';

export interface ToastStateType {
  icon: undefined | React.ReactNode;
  message: undefined | string;
  buttonText?: undefined | string;
  buttonHandler?: undefined | (() => void);
}

const toastState = atom<ToastStateType>({
  key: 'toastState',
  default: {
    icon: undefined,
    message: undefined,
    buttonText: undefined,
    buttonHandler: undefined,
  },
});

export default toastState;
