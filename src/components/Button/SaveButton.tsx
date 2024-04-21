import CTAButton from './CTAButton';
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
}

SaveButton.defaultProps = {
  disabled: false,
  onClick() {},
};

function SaveButton({ disabled, onClick }: Props) {
  return (
    <CTAButton icon={<SaveIcon />} disabled={disabled} onClick={onClick}>
      Save to Category
    </CTAButton>
  );
}

export default SaveButton;
