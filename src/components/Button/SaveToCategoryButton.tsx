import { ReactComponent as SaveIcon } from '@/assets/icons/save.svg';
import PlainButton from '@/components/Button/PlainButton';

function SaveToCategoryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <PlainButton {...props}>
      <SaveIcon />
      Save to Category
    </PlainButton>
  );
}

export default SaveToCategoryButton;
