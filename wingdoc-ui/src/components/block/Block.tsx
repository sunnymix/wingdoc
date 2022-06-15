import { forwardRef } from 'react';
import TextBlock from '@/components/block/components/TextBlock';
import CodeBlock from './components/CodeBlock';
import Editor from './editor/Editor';

export enum BlockType {
  TEXT = 'TEXT',
  CODE = 'CODE',
};

export namespace BlockType {
  export function all() {
    return [
      BlockType.TEXT,
      BlockType.CODE,
    ];
  }

  export function of(str: string) {
    switch (str) {
      case "CODE":
        return BlockType.CODE;
      case "TEXT":
      default:
        return BlockType.TEXT;
    }
  }
}

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
  return <Editor {... props}/>;
});

export default Block;
