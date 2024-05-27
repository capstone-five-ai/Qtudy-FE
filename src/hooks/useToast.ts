import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import toastState, { toastIconState } from '../recoil/atoms/toastState';

const useToast = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const [icon, setIcon] = useRecoilState(toastIconState);

  const removeToast = () => {
    setToast('');
  };

  const fireToast = (message: string, toastIcon?: ReactNode) => {
    setToast(message);
    if (toastIcon) setIcon(toastIcon);
    setTimeout(() => removeToast(), 1600);
  };

  return { toast, fireToast, icon };
};

export default useToast;
