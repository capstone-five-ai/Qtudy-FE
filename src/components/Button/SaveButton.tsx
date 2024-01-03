import DefaultButton from './DefaultButton';
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
    <DefaultButton icon={<SaveIcon />} disabled={disabled} onClick={onClick}>
      Save to Category
    </DefaultButton>
  );
}

export default SaveButton;
