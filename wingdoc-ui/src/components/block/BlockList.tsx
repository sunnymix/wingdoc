import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from './BlockApi';
import { Space, Button, Divider } from 'antd';
import BlockInfo from './BlockInfo';

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
  
  return <>
  <div>
    <Space direction="vertical" size="small" style={{width: "100%"}}>
      {blocks.map((block: any, index: number) => 
        <BlockInfo
          key={block.id}
          block={block}
          showBlock={props.showBlock}
          focus={index == focusPos}
          onEnter={handleBlockEnter}
          onDelete={handleBlockDelete}
          onMoveUp={handleBlockMoveUp}
          onMoveDown={handleBlockMoveDown}/>)
      }
    </Space>
  </div>
  </>
});

export default BlockList;
