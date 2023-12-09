import { useRecoilState } from 'recoil';
import toastState from '../recoil/atoms/toastState';

const useToast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  const removeToast = () => {
    setToast('');
  };

  const fireToast = (message: string) => {
    setToast(message);

    setTimeout(() => removeToast(), 1600);
  };

  return { toast, fireToast };
};

export default useToast;
