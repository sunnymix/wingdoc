import { forwardRef } from 'react';
import TextBlock from '@/components/block/components/TextBlock';

export interface BlockProps {
  data: any,
  showBlock?: boolean,
  focus?: boolean,
  onEnter?: Function,
  onDelete?: Function,
  onMoveUp?: Function,
  onMoveDown?: Function,
  onFocus?: Function,
  onFocusUp?: Function,
  onFocusDown?: Function,
  onSelectStart?: Function,
  onSelectStop?: Function,
  onCopy?: Function
};

const Block = forwardRef((props: BlockProps, ref) => {
  return <TextBlock {... props}/>;
});

export default Block;
