import { ReactComponent as TwinkleIcon } from '@/assets/icons/twinkle.svg';
import PlainButton from '@/components/Button/PlainButton';

interface GenerateButtonProps {
  onClick?: () => void;
}

function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <PlainButton onClick={onClick}>
      <TwinkleIcon />
      Generate
    </PlainButton>
  );
}

export default GenerateButton;
