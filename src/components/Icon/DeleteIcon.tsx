import { ReactComponent as TrashIcon } from '@/assets/icons/trash.svg';
import colors from '@/styles/color';
import { SVGProps } from 'react';

const DeleteIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  const defaultProps: SVGProps<SVGSVGElement> = {
    stroke: colors.grayScale04,
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return <TrashIcon {...defaultProps} {...props} />;
};

export default DeleteIcon;
