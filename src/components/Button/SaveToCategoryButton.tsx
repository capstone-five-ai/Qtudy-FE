import { ReactComponent as SaveIcon } from '@/assets/icons/save.svg';
import PlainButton from '@/components/Button/PlainButton';

interface SaveToCategoryButtonProps {
  onClick?: () => void;
}

function SaveToCategoryButton({ onClick }: SaveToCategoryButtonProps) {
  return (
    <PlainButton onClick={onClick}>
      <SaveIcon />
      Save to Category
    </PlainButton>
  );
}

export default SaveToCategoryButton;
