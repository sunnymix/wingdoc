import { forwardRef } from 'react';
import Editor from '../editor/Editor';

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
  focusingPos: BlockPosState,
  hoveringPos: BlockPosState,
  selectingActive: BlockActiveState,
  selectingStartPos: BlockPosState,
  selectingMulti: BlockSelectingMultiState,
  onEnter?: Function,
  onDelete?: Function,
  onMoveUp?: Function,
  onMoveDown?: Function,
  onFocus?: Function,
  onFocusUp?: Function,
  onFocusDown?: Function,
  onSelectStart?: Function,
  onSelectStop?: Function,
  onCopy?: Function,
  onMouseDown?: Function,
  onMouseUp?: Function,
  onMouseEnter?: Function,
};

// --- block data:

export interface BlockData {
  id: string,
  pos: number,
  text: string,
};

export namespace BlockData {
  export function of(id: string, pos: number, text: string): BlockData {
    return { id, pos, text };
  }
};

// --- pos state:

export interface BlockPosState {
  pos: number,
  ts: number,
};

export namespace BlockPosState {
  export function of(pos: number): BlockPosState {
    return { pos, ts: +(new Date()) };
  }
}

// --- bool state:

export interface BlockActiveState {
  active: boolean,
  ts: number,
};

export namespace BlockActiveState {
  export function of(active: boolean): BlockActiveState {
    return { active , ts: +(new Date()) };
  }
};

// --- selecting:

export interface BlockSelectingMultiState {
  multi: boolean,
  start: number,
  end: number,
  ts: number,
};

export namespace BlockSelectingMultiState {
  export function of(_start: number, _end: number, selectingActive: boolean): BlockSelectingMultiState {
    let start = _start, end = _end;
    if (_start > _end) {
      start = _end;
      end = _start;
    }

    const multi = (start > -1 && end > -1 && start != end) && selectingActive;
    return { multi, start, end, ts: +(new Date()) };
  }
}

// --- component:

const Block = forwardRef((props: BlockProps, ref) => {
  const { data } = props;
  return <Editor {... props}/>;
});

export default Block;
