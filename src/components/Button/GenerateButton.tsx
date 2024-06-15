import { ReactComponent as TwinkleIcon } from '@/assets/icons/twinkle.svg';
import PlainButton from '@/components/Button/PlainButton';

function GenerateButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <PlainButton {...props}>
      <TwinkleIcon />
      생성하기
    </PlainButton>
  );
}

export default GenerateButton;
