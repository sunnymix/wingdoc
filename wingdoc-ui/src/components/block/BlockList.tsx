import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from './BlockApi';
import Block from './Block';
import { useLocation } from 'umi';

interface BlockListProps {
  docId: string,
  showBlock?: boolean,
}

const BlockList = forwardRef((props: BlockListProps, ref) => {

  // --- method bind ---

  useImperativeHandle(ref, () => ({
    add: handleAdd,
  }));

  // --- loading ---

  const [loading, setLoading] = useState<boolean>(true);

  // --- active block ---

  const location: any = useLocation();
  const queryBlock = location.query?.block || null;
  const findBlockPos = (blocks: any[]) => {
    const findBlocks = blocks.filter((block: any) => block.id == queryBlock);
    if (findBlocks.length > 0) {
      return findBlocks[0].pos || 0;
    }
    return 0;
  };

  // --- blocks ---

  const [blocks, setBlocks] = useState<any[]>([]);

  const searchBlocks = (focusPos: any) => {
    setLoading(true);
    BlockApi.getBlockListOfDoc(props.docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);
      if (focusPos) {
        setFocusPos(focusPos);
      } else {
        const newFocusPos = findBlockPos(blocks);
        setFocusPos(newFocusPos);
      }
    });
  };

  // --- loaded ---

  useEffect(() => {
    searchBlocks(null);
  }, []);

  // --- focus ---

  const [focusPos, setFocusPos] = useState<Number>(0);

  const handleFocusUp = (blockData: any) => {
    setFocusPos(blockData.pos == 0 ? 0 : blockData.pos - 1);
  };

  const handleFocusDown = (blockData: any) => {
    setFocusPos(blockData.pos == blocks.length - 1 ? blockData.pos : blockData.pos + 1);
  };

  // --- add ---

  const handleAdd = (pos?: number) => {
    const addAtPos = pos || 0;
    BlockApi.addBlockToDoc(props.docId, { text: "", pos: addAtPos }, (newBlock: any) => {
      // TODO：由接口返回段落位置
      searchBlocks(addAtPos);
    });
  };

  // --- enter, add block ---

  const handleBlockEnter = (block: any) => {
    handleAdd(block.pos + 1);
  };

  // --- delete ---

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

  // --- move up ---

  const handleBlockMoveUp = (block: any) => {
    BlockApi.moveUp(block.id, (ok: any) => {
      // TODO：由接口返回段落位置
      const newFocusPos = block.pos == 0 ? 0 : block.pos - 1;
      searchBlocks(newFocusPos);
    });
  };

  // --- move down ---

  const handleBlockMoveDown = (block: any) => {
    BlockApi.moveDown(block.id, (ok: any) => {
      // TODO：确保后面有段落才能下移
      const newFocusPos = block.pos + 1;
      searchBlocks(newFocusPos);
    });
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
      console.log("copy:", all);
      // TODO：自定义复制组件
      // navigator.clipboard 只能在 localhost 或 https 中使用
      navigator.clipboard.writeText(all);
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
