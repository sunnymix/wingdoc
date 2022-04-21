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

  const handleSelect = (blockData: any) => {
    console.log(blockData);
  };
  
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
          onSelect={handleSelect}/>)
      }
    </div>
  </div>
  </>
});

export default BlockList;
