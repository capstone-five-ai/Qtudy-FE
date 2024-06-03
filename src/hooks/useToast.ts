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
    duration = buttonHandler ? 4000 : 1000,
  }: ToastStateType) => {
    setToast({ icon, message, buttonText, buttonHandler, duration });
    setTimeout(() => removeToast(), duration + 600);
  };

  return { fireToast, toast, removeToast };
};

export default useToast;
