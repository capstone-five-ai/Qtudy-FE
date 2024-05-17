import CTAButton from './CTAButton';
import { ReactComponent as SparkleIcon } from '../../assets/icons/sparkle.svg';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
}

GenerateButton.defaultProps = {
  disabled: false,
  onClick() {},
};

function GenerateButton({ disabled, onClick }: Props) {
  return (
    <CTAButton icon={<SparkleIcon />} disabled={disabled} onClick={onClick}>
      Generate
    </CTAButton>
  );
}

export default GenerateButton;
