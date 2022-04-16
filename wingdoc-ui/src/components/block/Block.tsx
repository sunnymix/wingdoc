import { forwardRef } from 'react';
import TextBlock from '@/components/block/types/TextBlock';
import { BlockProps } from '@/components/block/BlockInterfaces';

const Block = forwardRef((props: BlockProps, ref) => {
  return <TextBlock {... props}/>;
});

export default Block;
