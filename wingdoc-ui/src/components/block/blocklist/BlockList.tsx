import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from '../api/BlockApi';
import Block, { BlockActiveState, BlockData, BlockPosState, BlockSelectingMultiState } from '../block/Block';
import { useLocation } from 'umi';
import './BlockListStyle.css';
import Toc from '../toc/Toc';

export interface BlockerListProps {
  docId: string,
  onEmptyFocus?: Function,
  onFocusChange?: Function,
}



export default forwardRef((props: BlockerListProps, ref) => {

  // --- imperative:

  useImperativeHandle(ref, () => ({
    add: handleAdd,
    focusPos: (pos: number, row?: string) => {
      updateFocusing(pos, row);
    },
    getSize: () => {
      return blocks.length;
    },
  }));

  // -- props:

  const { docId, onEmptyFocus, onFocusChange } = props;

  // --- loading

  const [loading, setLoading] = useState<boolean>(true);

  // --- active block

  const location: any = useLocation();
  const queryBlock = location.query?.block || null;

  const findBlockPos = (blocks: any[]) => {
    const findBlocks = blocks.filter((block: any) => block.id == queryBlock);
    if (findBlocks.length > 0) {
      return findBlocks[0].pos;
    }
    return -1;
  };

  // --- blocks

  const [blocks, setBlocks] = useState<any[]>([]);

  const searchBlocks = (focusPos: any) => {    
    setLoading(true);
    BlockApi.getBlockListOfDoc(docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);

      var newFocusPos = -1;

      if (blocks && blocks.length > 0) {
        if (focusPos != null && focusPos >= 0 && focusPos < blocks.length) {
          newFocusPos = focusPos;
        } else {
          newFocusPos = findBlockPos(blocks);
        }
      }

      if (newFocusPos >= 0) {
        updateFocusing(newFocusPos);
      } else {
        onEmptyFocus?.call(null);
      }
    });
  };

  // --- loaded

  useEffect(() => {
    searchBlocks(null);
  }, [docId]);

  // --- focus

  const [focusingPos, setFocusingPos] = useState<BlockPosState>(BlockPosState.of(-1));

  const updateFocusing = (pos: number, row?: string) => {
    // row: first / last
    setFocusingPos(BlockPosState.of(pos, row));
  };

  useEffect(() => {
    onFocusChange?.call(null, focusingPos);
  }, [focusingPos]);

  const handleFocus = (data: any) => {
    updateFocusing(data.pos);
  };

  const handleFocusUp = (blockData: any) => {
    const newFocusPos = blockData.pos - 1;
    updateFocusing(newFocusPos, 'last');
  };

  const handleFocusDown = (blockData: any) => {
    updateFocusing(blockData.pos == blocks.length - 1 ? blockData.pos : blockData.pos + 1);
  };

  // --- add

  const handleAdd = (pos?: number) => {
    const addAtPos = pos || 0;
    BlockApi.addBlockToDoc(docId, { text: "", pos: addAtPos }, (newBlock: any) => {
      // TODO：由接口返回段落位置
      searchBlocks(addAtPos);
    });
  };

  // --- enter, add block

  const handleBlockEnter = (block: any, pos: string) => {
    // pos: start, middle, end
    var addBlockAtPos = 0;
    if (pos == 'start') {
      addBlockAtPos = block.pos;
    } else {
      addBlockAtPos = block.pos + 1;
    }
    handleAdd(addBlockAtPos);
  };

  // --- delete

  const deleteBlock = (block: any) => {
    BlockApi.deleteBlock(block.id, (ok: any) => {
      // TODO：由接口返回段落位置
      const newFocusPos = block.pos == 0 ? 0 : block.pos - 1;
      searchBlocks(newFocusPos);
    });
  };

  const handleBlockDelete = (block: any) => {
    deleteBlock(block);
  };

  // --- move up

  const handleBlockMoveUp = (block: any) => {
    BlockApi.moveUp(block.id, (ok: any) => {
      // TODO：由接口返回段落位置
      const newFocusPos = block.pos == 0 ? 0 : block.pos - 1;
      searchBlocks(newFocusPos);
    });
  };

  // --- move down

  const handleBlockMoveDown = (block: any) => {
    BlockApi.moveDown(block.id, (ok: any) => {
      // TODO：确保后面有段落才能下移
      const newFocusPos = block.pos + 1;
      searchBlocks(newFocusPos);
    });
  };

  // --- select

  const [selectStartPos, setSelectStartPos] = useState<number>(0);

  const [selectStopPos, setSelectStopPos] = useState<number>(0);

  const handleSelectStart = (blockData: any) => {
    setSelectStartPos(blockData.pos);
    setSelectStopPos(-1);
  };

  const handleSelectStop = (block: any) => {
    setSelectStopPos(block.pos);
  };

  const clearSelections = () => {
    const newBlocks = blocks.map((block: any, index: number) => {
      block.selectAll = false;
      return block;
    });
    setBlocks(newBlocks);
  };

  const updateSelections = () => {
    const start = selectStartPos < selectStopPos ? selectStartPos : selectStopPos;
    const stop = selectStopPos > selectStartPos ? selectStopPos : selectStartPos;
    if (start == stop) {
      return;
    }
    const newBlocks = blocks.map((block: any, index: number) => {
      block.selectAll = index >= start && index <= stop;
      return block;
    });
    setBlocks(newBlocks);
  };

  useEffect(() => {
    if (selectStopPos == -1) {
      clearSelections();
    } else {
      updateSelections();
    }
  }, [selectStopPos]);

  // --- old ^^^^^^^^^^

  // --- new vvvvvvvvvv:

  // --- copy:

  const copyText = useCallback((text: string) => {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    textarea.style.opacity = '0';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }, []);

  const handleCopy = (block: any) => {
    // TODO
  };

  // --- selecting:

  const [selectingActive, setSelectingActive] = useState<BlockActiveState>(BlockActiveState.of(false));

  const [selectingStartPos, setSelectingStartPos] = useState<BlockPosState>(BlockPosState.of(-1));

  const [hoveringPos, setHoveringPos] = useState<BlockPosState>(BlockPosState.of(-1));

  const [selectingMulti, setSelectingMulti] = useState<BlockSelectingMultiState>(BlockSelectingMultiState.of(-1, -1, false));

  const onMouseDown = (e: any, blockData: BlockData) => {
    setSelectingActive(BlockActiveState.of(true));
    setSelectingStartPos(BlockPosState.of(blockData.pos));
  };

  const onMouseEnter = (e: any, blockData: BlockData) => {
    setHoveringPos(BlockPosState.of(blockData.pos));
  };

  const onMouseUp = (e: any, blockData: BlockData) => {
    onSelectingEnd();
  };

  const onMouseLeave = (e: any) => {
    onSelectingEnd();
  }

  const onSelectingEnd = () => {
    if (selectingMulti.multi) {
      var text = '';
      for (var i = selectingMulti.start; i <= selectingMulti.end; i++) {
        if (i >= 0 && i < blocks.length) {
          const isLast = i == selectingMulti.end;
          const item = blocks[i];
          text = text + item.text + (isLast ? '\n' : '\n\n');
        }
      }
      copyText(text);
    }
    setSelectingActive(BlockActiveState.of(false));
  };

  useEffect(() => {
    setSelectingMulti(BlockSelectingMultiState.of(
      selectingStartPos.pos,
      hoveringPos.pos,
      selectingActive.active));
  }, [selectingActive, selectingStartPos, hoveringPos]);

  useEffect(() => {
    if (selectingMulti.multi) {
      window.getSelection()?.removeAllRanges();
    }
  }, [selectingMulti]);

  // --- text change:

  const handleTextChange = (data: any) => {
    // data: { id, text }
    const newBlocks: any = [];
    for (let i = 0; i < blocks.length; i++) {
      const item = blocks[i];
      if (item.id == data.id) {
        const newItem = { ...item };
        newItem.text = data.text;
        newBlocks.push(newItem);
      } else {
        newBlocks.push(item);
      }
    }
    setBlocks(newBlocks);
  };

  // --- ui
  
  return (
    <div className='blocklist'>
      <div className='blocklist_toc'>
        <Toc />
      </div>
      <div className='blocklist_body' onMouseLeave={onMouseLeave}>
        {blocks.map((block: any, index: number) =>
          <Block
            key={block.id}
            data={block}
            focusingPos={focusingPos}
            hoveringPos={hoveringPos}
            selectingActive={selectingActive}
            selectingMulti={selectingMulti}
            selectingStartPos={selectingStartPos}
            onEnter={handleBlockEnter}
            onDelete={handleBlockDelete}
            onMoveUp={handleBlockMoveUp}
            onMoveDown={handleBlockMoveDown}
            onFocus={handleFocus}
            onFocusUp={handleFocusUp}
            onFocusDown={handleFocusDown}
            onSelectStart={handleSelectStart}
            onSelectStop={handleSelectStop}
            onCopy={handleCopy}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onTextChange={handleTextChange} />)
        }
      </div>
    </div>
  );
});
