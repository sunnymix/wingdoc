import { forwardRef } from 'react';
import Editor from './editor/Editor';

export enum BlockType {
  TEXT = 'TEXT',
  TASK = 'TASK',
  CODE = 'CODE',
  IMG = 'IMG',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
};

export namespace BlockType {
  export function all() {
    return [
      BlockType.TEXT,
      BlockType.TASK,
      BlockType.CODE,
      BlockType.IMG,
      BlockType.H1,
      BlockType.H2,
      BlockType.H3,
      BlockType.H4,
    ];
  }

  export function short(type: BlockType) {
    switch (type) {
      case BlockType.TEXT:
        return 'P';
      case BlockType.TASK:
        return 'T';
      case BlockType.CODE:
        return 'C';
      case BlockType.IMG:
        return 'G';
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
      case BlockType.H4:
        return type;
      default:
        return '?';
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
