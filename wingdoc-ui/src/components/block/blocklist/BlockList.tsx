import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from '../api/BlockApi';
import Block, { BlockActiveState, BlockData, BlockPosState } from '../block/Block';
import { useLocation } from 'umi';
import './BlockListStyle.css';

export interface BlockerListProps {
  docId: string,
  showBlock?: boolean,
  onEmptyFocus?: Function,
  onFocusChange?: Function,
}



export default forwardRef((props: BlockerListProps, ref) => {

  // --- imperative:

  useImperativeHandle(ref, () => ({
    add: handleAdd,
    focusPos: (pos: number) => {
      updateFocusing(pos);
    },
    getSize: () => {
      return blocks.length;
    },
  }));

  // -- props:

  const { docId, showBlock, onEmptyFocus, onFocusChange } = props;

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

  const updateFocusing = (pos: number) => {
    setFocusingPos(BlockPosState.of(pos));
  };

  useEffect(() => {
    onFocusChange?.call(null, focusingPos);
  }, [focusingPos]);

  const handleFocus = (data: any) => {
    updateFocusing(data.pos);
  };

  const handleFocusUp = (blockData: any) => {
    const newFocusPos = blockData.pos - 1;
    updateFocusing(newFocusPos);
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

  // --- copy

  const handleCopy = (block: any) => {
    const selectBlocks = blocks.filter((block: any, index: number) => block.selectAll);
    if (selectBlocks.length > 0) {
      const all = selectBlocks.map((block: any, index: number) => block.text).join("\n");
      console.log("copy:", all);
      // TODO：自定义复制组件
      // navigator.clipboard 只能在 localhost 或 https 中使用
      navigator.clipboard.writeText(all);
    }
  };

  // --- old ^^^^^^^^^^

  // --- new vvvvvvvvvv:

  // --- select:

  const [selectingActive, setSelectingActive] = useState<BlockActiveState>(BlockActiveState.of(false));

  const [selectingStartPos, setSelectingStartPos] = useState<BlockPosState>(BlockPosState.of(-1));

  const [hoveringPos, setHoveringPos] = useState<BlockPosState>(BlockPosState.of(-1));

  const onMouseDown = (e: any, blockData: BlockData) => {
    setSelectingActive(BlockActiveState.of(true));
    setSelectingStartPos(BlockPosState.of(blockData.pos));
  };

  const onMouseUp = (e: any, blockData: BlockData) => {
    setSelectingActive(BlockActiveState.of(false));
    onSelectingChange(selectingStartPos.pos, hoveringPos.pos);
  };

  const onMouseEnter = (e: any, blockData: BlockData) => {
    setHoveringPos(BlockPosState.of(blockData.pos));
  };

  const onSelectingChange = (startPos: number, endPos: number) => {
    const ascOrder = endPos >= startPos;
    const start = ascOrder ? startPos : endPos;
    const end = ascOrder ? endPos : startPos;
    if (start >= 0 && end >= 0 && start != end) {
      BlockApi.getBlockListBetweenOfDoc(props.docId, start, end, (blockDatas: BlockData[]) => {
        const text = blockDatas.map((blockData: BlockData, index: number) => blockData.text).join("\n\n");
        // TODO：自定义复制组件
        // navigator.clipboard 只能在 localhost 或 https 中使用
        navigator.clipboard.writeText(text);
      });
    }
  };

  // --- ui
  
  return (
    <div className='blocklist'>
      {blocks.map((block: any, index: number) => 
        <Block
          key={block.id}
          data={block}
          focusingPos={focusingPos}
          hoveringPos={hoveringPos}
          selectingActive={selectingActive}
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
          onMouseEnter={onMouseEnter} />)
      }
    </div>
  );
});
