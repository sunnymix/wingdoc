import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from './BlockApi';
import Block from './Block';

interface BlockListProps {
  docId: string,
  showBlock?: boolean,
}

const BlockList = forwardRef((props: BlockListProps, ref) => {

  useImperativeHandle(ref, () => ({
    add: handleAdd,
  }));

  const [loading, setLoading] = useState<boolean>(true);

  const [blocks, setBlocks] = useState<any[]>([]);

  const [focusPos, setFocusPos] = useState<Number>(0);

  const searchBlocks = () => {
    setLoading(true);
    BlockApi.getBlockListOfDoc(props.docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);
    });
  };

  useEffect(() => {
    searchBlocks();
  }, []);

  const handleAdd = (pos?: number) => {
    const addAtPos = pos || 0;
    setFocusPos(addAtPos);
    BlockApi.addBlockToDoc(props.docId, { text: "", pos: addAtPos }, (newBlock: any) => {
      searchBlocks();
    });
  };

  const handleBlockEnter = (block: any) => {
    handleAdd(block.pos + 1);
  };

  const deleteBlock = (block: any) => {
    setFocusPos( block.pos == 0 ? 0 : block.pos - 1);
    BlockApi.deleteBlock(block.id, (ok: any) => {
      searchBlocks();
    });
  };

  const handleBlockDelete = (block: any) => {
    deleteBlock(block);
  };

  const handleBlockMoveUp = (block: any) => {
    BlockApi.moveUp(block.id, (ok: any) => {
      searchBlocks();
    });
  };

  const handleBlockMoveDown = (block: any) => {
    BlockApi.moveDown(block.id, (ok: any) => {
      searchBlocks();
    });
  };

  const handleFocusUp = (blockData: any) => {
    setFocusPos(blockData.pos == 0 ? 0 : blockData.pos - 1);
  };

  const handleFocusDown = (blockData: any) => {
    setFocusPos(blockData.pos == blocks.length - 1 ? blockData.pos : blockData.pos + 1);
  };

  // --- select ---

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
  }, [selectStopPos])

  // --- copy ---

  const handleCopy = (block: any) => {
    const selectBlocks = blocks.filter((block: any, index: number) => block.selectAll);
    if (selectBlocks.length > 0) {
      const all = selectBlocks.map((block: any, index: number) => block.text).join("\n");
      console.log(all);
    }
  };

  // --- ui ---
  
  return <>
  <div>
    <div>
      {blocks.map((block: any, index: number) => 
        <Block
          key={block.id}
          data={block}
          showBlock={props.showBlock}
          focus={index == focusPos}
          onEnter={handleBlockEnter}
          onDelete={handleBlockDelete}
          onMoveUp={handleBlockMoveUp}
          onMoveDown={handleBlockMoveDown}
          onFocusUp={handleFocusUp}
          onFocusDown={handleFocusDown}
          onSelectStart={handleSelectStart}
          onSelectStop={handleSelectStop}
          onCopy={handleCopy}/>)
      }
    </div>
  </div>
  </>
});

export default BlockList;
