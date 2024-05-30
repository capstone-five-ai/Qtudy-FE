import toastState, { ToastStateType } from '@/recoils/atoms/toastState';
import { useRecoilState, useResetRecoilState } from 'recoil';

const useToast = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const resetToast = useResetRecoilState(toastState);

  const removeToast = () => {
    resetToast();
  };

  const fireToast = ({
    icon,
    message,
    buttonText = undefined,
    buttonHandler = undefined,
  }: ToastStateType) => {
    setToast({ icon, message, buttonText, buttonHandler });
    setTimeout(() => removeToast(), 1600);
  };

  return { fireToast, toast };
};

export default useToast;
