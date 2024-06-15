import { ReactComponent as SaveIcon } from '@/assets/icons/save.svg';
import PlainButton from '@/components/Button/PlainButton';

function SaveToCategoryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <PlainButton {...props}>
      <SaveIcon />
      카테고리에 저장
    </PlainButton>
  );
}

export default SaveToCategoryButton;
