import { ReactComponent as TwinkleIcon } from '@/assets/icons/twinkle.svg';
import PlainButton from '@/components/Button/PlainButton';

// 버튼 속성 전달

function GenerateButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <PlainButton {...props}>
      <TwinkleIcon />
      Generate
    </PlainButton>
  );
}

export default GenerateButton;
