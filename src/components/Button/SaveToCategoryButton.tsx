import { ReactComponent as SaveIcon } from '@/assets/icons/save.svg';
import PlainButton from '@/components/Button/PlainButton';
import { CATEGORY_TYPE } from '@/constants';
import { ServiceType } from '@/types/category.type';

interface SaveToCategoryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  generateType: ServiceType;
}

function SaveToCategoryButton({
  generateType,
  ...props
}: SaveToCategoryButtonProps) {
  return (
    <PlainButton {...props}>
      <SaveIcon />
      카테고리에 {CATEGORY_TYPE[generateType]} 추가
    </PlainButton>
  );
}

export default SaveToCategoryButton;
