import { forwardRef } from 'react';
import TextBlock from '@/components/block/components/TextBlock';
import CodeBlock from './components/CodeBlock';

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
  const { data } = props;

  if (data.type == 'CODE') {
    return <CodeBlock {... props}/>;
  }
  
  return <TextBlock {... props}/>;
});

export default Block;
